var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabase(builder.Configuration)
                .AddCustomCors(builder.Environment)
                .AddApplicationServices();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<MockAuthMiddleware>();
app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();

await app.MigrateAndSeedAsync();

app.Run();