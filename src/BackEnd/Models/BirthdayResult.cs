using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNetLab.Models
{
    public class BirthdayResult
    {
        public int Age { get; set; }
        public bool IsAdult { get; set; }
        public bool IsBirthdayToday { get; set; }
        public string WesternZodiacSign { get; set; }
        public string ChineseZodiacSign { get; set; }
        public string ErrorMessage { get; set; }
    }

}