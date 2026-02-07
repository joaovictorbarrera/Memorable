namespace Server.Models
{
    public class User
    {
        public Guid UserId { get; set; } = Guid.NewGuid();
        public required string Username { get; set; }
        public required string ProfileImageUrl { get; set; }
    }
}
