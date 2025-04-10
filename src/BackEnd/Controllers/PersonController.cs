using DotNetLab.Models;
using DotNetLab.Services;
using DotNetLab.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DotNetLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private static List<Person> _allUsers;
        private readonly ILogger<PersonController> _logger;
        private readonly IPersonService _personService;

        public PersonController(ILogger<PersonController> logger, IPersonService personService)
        {
            _logger = logger;
            _personService = personService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetUsers(
            [FromQuery] string? searchTerm,
            [FromQuery] string? startDate,
            [FromQuery] string? endDate,
            [FromQuery] string? searchEmail,
            [FromQuery] string? searchSunSign,
            [FromQuery] string? searchChineseSign,
            [FromQuery] string? filterIsAdult,
            [FromQuery] string? filterIsBirthday,
            [FromQuery] string? sortField,
            [FromQuery] string sortDirection = "asc")
        {
            try
            {
                if (_allUsers == null)
                {
                    var mainPath = "../../../users.json";
                    var backupPath = "../../../presaved_users.json";

                    if (System.IO.File.Exists(mainPath))
                    {
                        _allUsers = await _personService.ProcessUsersFromFileAsync(mainPath);
                    }
                    else if (System.IO.File.Exists(backupPath))
                    {
                        _allUsers = await _personService.ProcessUsersFromFileAsync(backupPath);
                    }
                }

                var filteredUsers = _allUsers;

                if (!string.IsNullOrEmpty(searchTerm))
                {
                    filteredUsers = _personService.SearchUsers(filteredUsers, searchTerm);
                }

                if (!string.IsNullOrEmpty(startDate) || !string.IsNullOrEmpty(endDate))
                {
                    filteredUsers = _personService.SearchDateRange(filteredUsers, startDate, endDate);
                }

                if (!string.IsNullOrEmpty(searchEmail))
                {
                    filteredUsers = _personService.SearchEmail(filteredUsers, searchEmail);
                }

                if (!string.IsNullOrEmpty(searchSunSign))
                {
                    filteredUsers = _personService.SearchSunSign(filteredUsers, searchSunSign);
                }

                if (!string.IsNullOrEmpty(searchChineseSign))
                {
                    filteredUsers = _personService.SearchChineseSign(filteredUsers, searchChineseSign);
                }

                if (filterIsAdult != "any" && !string.IsNullOrEmpty(filterIsAdult))
                {
                    filteredUsers = _personService.FilterAdult(filteredUsers, filterIsAdult);
                }

                if (filterIsBirthday != "any" && !string.IsNullOrEmpty(filterIsBirthday))
                {
                    filteredUsers = _personService.FilterBirthday(filteredUsers, filterIsBirthday);
                }

                if (!string.IsNullOrEmpty(sortField))
                {
                    filteredUsers = _personService.MakeSort(filteredUsers, sortField, sortDirection).ToList();
                }

                return Ok(filteredUsers);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error processing users: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PersonRequestModel request)
        {
            try
            {
                var personModel = new PersonModel
                {
                    Id = _allUsers.Last().Id + 1,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Birthdate = DateTime.Parse(request.Birthdate)
                };

                var newUser = await _personService.CalculatePersonInfoAsync(personModel);

                if (_allUsers == null)
                {
                    _allUsers = new List<Person>();
                }

                _allUsers.Add(newUser);

                _personService.SerializeUsersToFile(_allUsers, "../../../users.json");

                return new JsonResult(newUser);
            }
            catch (FutureBirthdateException ex)
            {
                return BadRequest(new Person() { ErrorMessage = ex.Message });
            }
            catch (AncientBirthdateException ex)
            {
                return BadRequest(new Person() { ErrorMessage = ex.Message });
            }
            catch (InvalidEmailException ex)
            {
                return BadRequest(new Person() { ErrorMessage = ex.Message });
            }
            catch (InvalidSortFieldException ex)
            {
                return BadRequest(new Person() { ErrorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding user: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var userToDelete = _allUsers.FirstOrDefault(user => user.Id == id);
                if (userToDelete == null)
                {
                    return NotFound();
                }

                _allUsers.Remove(userToDelete);

                _personService.SerializeUsersToFile(_allUsers, "../../../users.json");

                return Ok(_allUsers);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting user: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PersonRequestModel updatedPerson)
        {
            try
            {
                var userToUpdate = _allUsers.FirstOrDefault(user => user.Id == id);
                if (userToUpdate == null)
                {
                    return NotFound();
                }

                var personModel = new PersonModel
                {
                    Id = userToUpdate.Id,
                    FirstName = updatedPerson.FirstName,
                    LastName = updatedPerson.LastName,
                    Email = updatedPerson.Email,
                    Birthdate = DateTime.Parse(updatedPerson.Birthdate)
                };

                var resultPerson = await _personService.CalculatePersonInfoAsync(personModel);

                userToUpdate.FirstName = resultPerson.FirstName;
                userToUpdate.LastName = resultPerson.LastName;
                userToUpdate.EmailAddress = resultPerson.EmailAddress;
                userToUpdate.BirthDate = resultPerson.BirthDate;
                userToUpdate.IsAdult = resultPerson.IsAdult;
                userToUpdate.SunSign = resultPerson.SunSign;
                userToUpdate.ChineseSign = resultPerson.ChineseSign;

                _personService.SerializeUsersToFile(_allUsers, "../../../users.json");

                return new JsonResult(userToUpdate);
            }
            catch (FutureBirthdateException ex)
            {
                return BadRequest(new ErrorResult() { ErrorMessage = ex.Message });
            }
            catch (AncientBirthdateException ex)
            {
                return BadRequest(new ErrorResult() { ErrorMessage = ex.Message });
            }
            catch (InvalidEmailException ex)
            {
                return BadRequest(new ErrorResult() { ErrorMessage = ex.Message });
            }
            catch (InvalidSortFieldException ex)
            {
                return BadRequest(new ErrorResult() { ErrorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating user: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


    }
}