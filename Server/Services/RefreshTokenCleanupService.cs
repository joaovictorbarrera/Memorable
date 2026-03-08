using Server.Data;

namespace Server.Services
{
    public class RefreshTokenCleanupService(IServiceScopeFactory _scopeFactory) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var tokens = context.RefreshTokens
                    .Where(t => t.Expires < DateTime.UtcNow);

                context.RefreshTokens.RemoveRange(tokens);

                await context.SaveChangesAsync(stoppingToken);

                await Task.Delay(TimeSpan.FromHours(12), stoppingToken);
            }
        }
    }
}
