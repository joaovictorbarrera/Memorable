using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Server.Services.ImageUpload
{
    public interface IImageUploadService
    {
        Task<string> UploadAsync(IFormFile image);
    }
}