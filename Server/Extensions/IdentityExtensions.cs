using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Server.Configuration;
using Server.Data;
using Server.Models;
using System.Text;

namespace Server.Extensions
{
    public static class IdentityExtensions
    {
        public static IServiceCollection AddIdentitySettings(this IServiceCollection services)
        {
            services.AddIdentityCore<ApplicationUser>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
            })
            .AddRoles<IdentityRole<Guid>>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddSignInManager()
            .AddDefaultTokenProviders();

            var jwtConfiguration = services.BuildServiceProvider().GetRequiredService<IConfiguration>()
            .GetSection("JWT");
            
            services.Configure<JwtSettings>(jwtConfiguration);

            var jwtSettings = jwtConfiguration.Get<JwtSettings>()
            ?? throw new InvalidOperationException("JWT configuration missing");

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
                };
            });

            services.AddAuthorization();

            return services;
        }
    }
}
