# Stage 1 — Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore first (caching)
COPY *.csproj ./
RUN dotnet restore

# Copy everything else
COPY . ./

# Publish the project
RUN dotnet publish -c Release -o out

# Stage 2 — Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./out

# Environment variables
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true

# Expose port (optional, for local testing)
EXPOSE 8000

# Start the app
ENTRYPOINT ["dotnet", "out/Server.dll"]