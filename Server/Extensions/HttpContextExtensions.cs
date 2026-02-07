using System.Security.Claims;

namespace Server.Extensions
{
    public static class HttpContextExtensions
    {
        public static Guid GetUserId(this HttpContext context)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException("User is not authenticated");

            return Guid.Parse(userId);
        }
    }
}
