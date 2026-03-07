using Server.Extensions;

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

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.MapControllers();

await app.MigrateAndSeedAsync();

app.Run();
