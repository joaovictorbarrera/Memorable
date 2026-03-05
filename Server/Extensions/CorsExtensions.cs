public static class CorsExtensions
{
    public static IServiceCollection AddCustomCors(this IServiceCollection services, IWebHostEnvironment env)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                if (env.IsDevelopment())
                {
                    Console.WriteLine("Cors for All");
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                }
                else
                {
                    policy.WithOrigins("https://memorable-two.vercel.app")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                }
            });
        });

        return services;
    }
}