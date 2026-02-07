namespace Server.Dtos
{
    public class PostCreateDto
    {
        public string? TextContent { get; set; }
        public IFormFile? Image { get; set; }
    }
}
