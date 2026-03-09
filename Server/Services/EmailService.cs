using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Server.Services
{
    using Microsoft.Extensions.Options;
    using Server.Models;
    using System.Net.Mail;

    public class EmailService
    {
        private readonly EmailSettings _config;

        public EmailService(IOptions<EmailSettings> options)
        {
            _config = options.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var email = new MimeMessage();

            email.From.Add(new MailboxAddress(_config.SenderName, _config.SenderEmail));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;

            email.Body = new TextPart("html")
            {
                Text = body
            };

            using var smtp = new MailKit.Net.Smtp.SmtpClient();

            await smtp.ConnectAsync(_config.SmtpServer, _config.Port, SecureSocketOptions.StartTls);

            await smtp.AuthenticateAsync(_config.Username, _config.Password);

            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
