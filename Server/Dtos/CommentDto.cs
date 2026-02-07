namespace Server.Dtos
{
    public class CommentDto
    {
        public required Guid CommentId { get; set; }
        public required Guid PostId { get; set; }
        public required Guid UserId { get; set; }
        public required string TextContent { get; set; }
        public required DateTime CreatedAt { get; set; }

        public required string Username { get; set; }

        public required string UserProfileImageUrl { get; set; }
    }
}
