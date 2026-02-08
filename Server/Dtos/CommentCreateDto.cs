namespace Server.Dtos
{
    public class CommentCreateDto
    {
        public required string TextContent { get; set; }
        public required Guid PostId { get; set; }
    }
}
