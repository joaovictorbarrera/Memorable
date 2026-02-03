namespace Server.Dtos
{
    public class CommentDto
    {
        public required int CommentId { get; set; }
        public required int PostId { get; set; }
        public required int UserId { get; set; }
        public required string TextContent { get; set; }
        public required DateTime CreatedAt { get; set; }

        public required string Username { get; set; }

        public required string UserProfileImageUrl { get; set; }
    }
}
