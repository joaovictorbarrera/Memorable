using Server.Services;

namespace Server.Models
{
    public class Comment
    {
        public Guid CommentId { get; set; } = Guid.NewGuid();
        public Guid PostId { get; set; }
        public Guid UserId { get; set; }
        public required string TextContent { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
