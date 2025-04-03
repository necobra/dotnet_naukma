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
        private readonly ILogger<PersonController> _logger;
        private readonly IPersonService _personService;

        public PersonController(ILogger<PersonController> logger, IPersonService personService)
        {
            _logger = logger;
            _personService = personService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PersonRequestModel request)
        {
            if (string.IsNullOrEmpty(request.FirstName) || string.IsNullOrEmpty(request.LastName) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Birthdate.ToString()))
            {
                return BadRequest(new ErrorResult() { ErrorMessage = "Bad data" });
            }

            _logger.LogInformation($"Recieved person: {request.Birthdate}");

            var personModel = new PersonModel
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Birthdate = DateTime.Parse(request.Birthdate)
            };

            try
            {
                var result = await _personService.CalculatePersonInfoAsync(personModel);
                return new JsonResult(result);
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
        }
    }
}