using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Extensions;
using Server.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabase(builder.Configuration)
                .AddCustomCors(builder.Environment)
                .AddApplicationServices()
                .AddIdentitySettings();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseMiddleware<MockAuthMiddleware>();
app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();

await app.MigrateAndSeedAsync();

app.Run();
