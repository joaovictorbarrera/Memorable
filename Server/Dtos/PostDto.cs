namespace Server.Dtos
{
    public class PostDto
    {
        public required Guid PostId { get; set; }
        public string? TextContent { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required Guid UserId { get; set; }
        public String? ImageUrl { get; set; }

        public required string Username { get; set; }
        public required string UserProfileImageUrl { get; set; }
        public required int LikeCount { get; set; } = 0;

        public required bool IsLikedByCurrentUser { get; set; } = false;
        public List<CommentDto>? Comments { get; set; } = new List<CommentDto>();
    }
}
