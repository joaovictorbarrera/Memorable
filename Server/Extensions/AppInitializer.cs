using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Services.MockupData;

public static class AppInitializer
{
    public static async Task MigrateAndSeedAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await dbContext.Database.MigrateAsync();

        try
        {
            await DbSeeder.SeedAsync(dbContext);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Seeding failed: {ex.Message}");
        }
    }
}