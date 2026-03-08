namespace Server.Models
{
    namespace Server.Models
    {
        public class RefreshToken
        {
            public int Id { get; set; }

            public string Token { get; set; } = null!;

            public DateTime Expires { get; set; }

            public DateTime Created { get; set; }

            public string CreatedByIp { get; set; } = null!;

            public DateTime? Revoked { get; set; }

            public string? RevokedByIp { get; set; }

            public string? ReplacedByToken { get; set; }

            public Guid UserId { get; set; }

            public ApplicationUser User { get; set; } = null!;

            public bool IsExpired => DateTime.UtcNow >= Expires;

            public bool IsActive => Revoked == null && !IsExpired;
        }
    }
}
