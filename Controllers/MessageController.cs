using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PatricioPersonal.Models;
using SendGrid.Helpers.Mail;
using SendGrid;
using PatricioPersonal.Data;

namespace PatricioPersonal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly ProfileDbContext context;

        public MessageController(ProfileDbContext context)
        {
            this.context = context;
        }

        [HttpPost("[action]")]
        public async Task<string> Send([FromForm] Email email)
        {
            var subject = email.purpose != Purpose.OTHER ? email.purpose.ToString() : "A Brief Message";
            var senderInfo = email.senderType != Sender.OTHER ? email.senderType.ToString() : "";
            string content =
                $"<p>{email.message}</p>" +
                $"<p style=\"margin-top: 45px;\">from {email.sender}</p>" +
                $"<p style=\"text-transform: lowercase;\">{senderInfo}</p>";

            await EmailMessage(subject, content, email.sender);
            ConfirmMessage(email.sender);
            return "Message Sent Successfully";
        }

        private async Task<Response> EmailMessage(string subject, string content, string address)
        {
            //TODO var receiver = context.Current("PatricioPersonal").Email;
            var receiver = "kazenowindflowe9@gmail.com";

            var msg = new SendGridMessage();

            msg.SetFrom(new EmailAddress(address, "Message From Personal Website"));

            var recipients = new List<EmailAddress>
            {
                new EmailAddress(receiver, "Patricio")
            };
            msg.AddTos(recipients);

            msg.SetSubject(subject);
            msg.AddContent(MimeType.Html,
                $"<div>" +
                $"  <h3 style=\"color: #4EBFD9;\">Message Received from Personal Website</h3>" +
                $"  <hr /><div>{ content }</div>" +
                $"</div>"
            );

            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_APIKEY");
            var client = new SendGridClient(apiKey);
            return await client.SendEmailAsync(msg);
        }

        private async void ConfirmMessage(string address)
        {
            var msg = new SendGridMessage();

            msg.SetFrom(new EmailAddress("no-reply@kazepatriciochan.com", "Kaze Patricio Chan"));

            var recipients = new List<EmailAddress>
            {
                new EmailAddress(address)
            };
            msg.AddTos(recipients);

            msg.SetSubject("Thanks for taking an Interest!");
            msg.AddContent(MimeType.Html,
                $"<div>" +
                $"  <h3 style=\"color: #4EBFD9;\">Thanks For Taking an Interest</h3>" +
                $"  <hr /><p>This is an automated reply, I have received the message you left me</p>" +
                $"  <p>I will get back to you as soon as I can</p>" +
                $"</div>"
            );

            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_APIKEY");
            var client = new SendGridClient(apiKey);
            await client.SendEmailAsync(msg);
        }
    }
}