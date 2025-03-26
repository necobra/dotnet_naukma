using DotNetLab.src.BackEnd.Models;

namespace DotNetLab.src.BackEnd.Services
{
    public interface IBirthdayService
    {
        BirthdayResult CalculateBirthdayInfo(BirthdayModel model);
    }
}