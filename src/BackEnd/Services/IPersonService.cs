using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DotNetLab.Models;

namespace DotNetLab.Services
{
    public interface IPersonService
    {
        Task<Person> CalculatePersonInfoAsync(PersonModel model);
    }
}
    