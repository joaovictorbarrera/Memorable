using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Server.Configuration;
using System.Net.Http.Headers;
using System.Text.Json;

namespace Server.Services.ImageUpload
{
    public class ImgBbImageUploadService : IImageUploadService
    {
        private readonly HttpClient _http;
        private readonly ImgBbOptions _options;

        public ImgBbImageUploadService(HttpClient http, IOptions<ImgBbOptions> options)
        {
            _http = http;
            _options = options.Value;
        }

        public async Task<string> UploadAsync(IFormFile image)
        {
            if (image == null || image.Length == 0)
                throw new ArgumentException("Image cannot be null or empty.");

            using var form = new MultipartFormDataContent();

            using var stream = image.OpenReadStream();
            var content = new StreamContent(stream);
            content.Headers.ContentType = new MediaTypeHeaderValue(image.ContentType);
            form.Add(content, "image", image.FileName);

            // Make the POST request
            var response = await _http.PostAsync(
                $"https://api.imgbb.com/1/upload?key={_options.ApiKey}",
                form
            );

            if (!response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"imgBB upload failed: {response.StatusCode}, {body}");
            }

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);

            // imgBB response contains: data.url
            if (doc.RootElement.TryGetProperty("data", out var data) &&
                data.TryGetProperty("url", out var url))
            {
                return url.GetString()!;
            }

            throw new Exception("imgBB response did not contain a URL.");
        }
    }
}
