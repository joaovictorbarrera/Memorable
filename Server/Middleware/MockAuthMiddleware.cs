using Server.Authorization;
using Server.Models;
using System.Security.Claims;
using Server.Services.Interfaces;

public class MockAuthMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        var endpoint = context.GetEndpoint();

        // Skip mock auth for anonymous endpoints
        if (endpoint?.Metadata.GetMetadata<MockAllowAnonymousAttribute>() != null)
        {
            await _next(context);
            return;
        }

        // Resolve IUserService from the request scope
        var userService = context.RequestServices.GetRequiredService<IUserService>();

        // Fetch user from DB by username
        ApplicationUser? mockUser = await userService.GetUserByUsername("john.barrera");

        if (mockUser == null)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("No users available for mock auth.");
            return;
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, mockUser.Id.ToString()),
            new Claim(ClaimTypes.Name, mockUser.UserName ?? "MockUser"),
            new Claim(ClaimTypes.Role, "User")
        };

        context.User = new ClaimsPrincipal(
            new ClaimsIdentity(claims, "MockAuth")
        );

        await _next(context);
    }
}