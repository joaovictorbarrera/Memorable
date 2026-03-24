namespace Server.Dtos
{
    public class UploadProfileImageRequestDto
    {
        public required IFormFile File { get; set; }
    }
}
