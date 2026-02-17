namespace Server.Dtos
{
    public class PostDto
    {
        public required Guid PostId { get; set; }
        public string? TextContent { get; set; }
        public String? ImageUrl { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required Guid UserId { get; set; }

        public required string Username { get; set; }
        public required string DisplayName { get; set; }
        public required string UserProfileImageUrl { get; set; }
        public required int LikeCount { get; set; } = 0;

        public required bool IsLikedByCurrentUser { get; set; } = false;
        public required List<CommentDto> InitialComments { get; set; } = [];
        public required int CommentCount { get; set; } = 0;
    }
}
