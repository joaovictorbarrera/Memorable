namespace Server.Models
{
    public class User
    {
        public int UserId { get; set; }
        public required string Username { get; set; }
        public required string ProfileImageUrl { get; set; }
    }
}
