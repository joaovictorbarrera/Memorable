namespace Server.Models
{
    public class Like
    {
        public Guid LikeId { get; set; } = Guid.NewGuid();
        public Guid PostId { get; set; }
        public Guid UserId { get; set; }
    }
}
