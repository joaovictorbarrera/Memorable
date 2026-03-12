using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Options;
using Server.Models;

namespace Server.Services
{
    public class EmailService
    {
        private readonly EmailSettings _config;

        public EmailService(IOptions<EmailSettings> options)
        {
            _config = options.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var client = new SendGridClient(_config.ApiKey);

            var from = new EmailAddress(_config.SenderEmail, _config.SenderName);
            var to = new EmailAddress(toEmail);

            var msg = MailHelper.CreateSingleEmail(
                from,
                to,
                subject,
                "",
                body
            );

            await client.SendEmailAsync(msg);
        }
    }
}
