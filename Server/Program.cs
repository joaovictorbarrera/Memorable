using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Server.Configuration;
using Server.Services.ImageUpload;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            // Allow all origins in development
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
        else
        {
            // Restrict to production frontend
            policy.WithOrigins("https://memorable-two.vercel.app")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

builder.Services.AddHttpClient<IImageUploadService, ImgBbImageUploadService>();

builder.Services.Configure<ImgBbOptions>(
    builder.Configuration.GetSection("ImgBB")
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
}

// Temporary mock authentication middleware for development/testing
app.UseMiddleware<MockAuthMiddleware>();

app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
