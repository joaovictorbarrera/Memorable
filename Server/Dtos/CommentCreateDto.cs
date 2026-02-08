namespace Server.Dtos
{
    public class CommentCreateDto
    {
        public required string TextContent;

        public required Guid PostId;
    }
}
