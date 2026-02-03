namespace Server.Dtos
{
    public class PostCreateDto
    {
        public required string TextContent { get; set; }
        public string? ImageUrl { get; set; }
    }
}
