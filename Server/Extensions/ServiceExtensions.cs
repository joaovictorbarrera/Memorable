using Server.Configuration;
using Server.Services;
using Server.Services.ImageUpload;
using Server.Services.Interfaces;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddHttpClient<IImageUploadService, ImgBbImageUploadService>();
        services.Configure<ImgBbOptions>(services.BuildServiceProvider().GetRequiredService<IConfiguration>().GetSection("ImgBB"));

        services.AddScoped<IPostService, PostService>()
                .AddScoped<IUserService, UserService>()
                .AddScoped<IInteractionService, InteractionService>()
                .AddScoped<TokenService>()
                .AddHostedService<RefreshTokenCleanupService>()
                .AddScoped<EmailService>();

        return services;
    }
}