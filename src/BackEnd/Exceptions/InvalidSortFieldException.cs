namespace DotNetLab.Exceptions
{
    public class InvalidSortFieldException : Exception
    {
        public InvalidSortFieldException(string message = "Неправильне сортування.") : base(message) { }
    }
}