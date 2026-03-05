using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services.MockupData;

public static class AppInitializer
{
    public static async Task MigrateAndSeedAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

        await dbContext.Database.MigrateAsync();

        try
        {
            Console.WriteLine("Creating roles...");
            string[] roles = { "User", "Admin" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole<Guid>(role));
                }
            }

            // Only if database has been dropped
            //await DbSeeder.SeedAsync(dbContext, userManager);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Seeding failed: {ex}");
        }
    }
}