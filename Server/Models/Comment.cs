using Server.Services;

namespace Server.Models
{
    public class Comment
    {
        public int CommentId { get; set; } = Mockdata._comments.Count + 1;
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string TextContent { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
