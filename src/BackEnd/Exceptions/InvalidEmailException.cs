namespace DotNetLab.Exceptions
{
    public class InvalidEmailException : Exception
    {
        public InvalidEmailException(string message = "Недійсна адреса електронної пошти.") : base(message) {}
    }
}