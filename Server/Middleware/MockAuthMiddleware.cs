using Server.Authorization;
using Server.Services;
using Server.Models;
using System.Security.Claims;

public class MockAuthMiddleware
{
    private readonly RequestDelegate _next;

    public MockAuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var endpoint = context.GetEndpoint();

        // Skip mock auth for anonymous endpoints
        if (endpoint?.Metadata.GetMetadata<MockAllowAnonymousAttribute>() != null)
        {
            await _next(context);
            return;
        }

        Guid mockUserId = Mockdata._currentUserId;
        User mockUser = Mockdata._users.FirstOrDefault(u => u.UserId == mockUserId) ?? Mockdata._users[0];

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, mockUserId.ToString()),
            new Claim(ClaimTypes.Name, mockUser.Username ?? "MockUser"),
            new Claim(ClaimTypes.Role, "User")
        };

        context.User = new ClaimsPrincipal(
            new ClaimsIdentity(claims, "MockAuth")
        );

        await _next(context);
    }
}
