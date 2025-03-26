using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNetLab.src.BackEnd.Models
{
    public class BirthdayModel
    {
        public DateTime Birthdate { get; set; }

        public override string ToString()
        {
            return $"Дата народження: {Birthdate}";
        }
    }
}
