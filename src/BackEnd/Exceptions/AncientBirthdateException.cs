namespace DotNetLab.Exceptions
{
    public class AncientBirthdateException : Exception
    {
        public AncientBirthdateException(string message = "Дата народження занадто давня.") : base(message) {}
    }
}
    