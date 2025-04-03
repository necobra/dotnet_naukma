namespace DotNetLab.Exceptions
{
    public class FutureBirthdateException : Exception
    {
        public FutureBirthdateException(string message = "Дата народження не може бути у майбутньому.") : base(message) {}
    }
}