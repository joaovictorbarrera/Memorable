using Microsoft.EntityFrameworkCore;
using Server.Data;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration config)
    {
        string? host = Environment.GetEnvironmentVariable("DB_HOST");
        string? port = Environment.GetEnvironmentVariable("DB_PORT");
        string? database = Environment.GetEnvironmentVariable("DB_NAME");
        string? username = Environment.GetEnvironmentVariable("DB_USER");
        string? password = Environment.GetEnvironmentVariable("DB_PASSWORD");

        string connectionString = (!string.IsNullOrEmpty(host) &&
                                   !string.IsNullOrEmpty(port) &&
                                   !string.IsNullOrEmpty(database) &&
                                   !string.IsNullOrEmpty(username) &&
                                   !string.IsNullOrEmpty(password))
            ? $"Host={host};Port={port};Database={database};Username={username};Password={password}"
            : config.GetConnectionString("DefaultConnection")
              ?? throw new InvalidOperationException("No database connection string configured.");

        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));

        return services;
    }
}