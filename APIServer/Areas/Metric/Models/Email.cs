using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Metric.Models
{
    public class Email
    {
        public int Id { get; set; }
        [Required]
        public string Address { get; set; }
        public string Message { get; set; }
        public EmailPurpose Purpose { get; set; }
        public SenderType Sender { get; set; }
        [Required]
        public bool IsSuccess { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public enum EmailPurpose
        {
            DEAL,
            OTHER
        }
        public enum SenderType
        {
            DIRECTOR,
            MUSICIAN,
            OTHER
        }
    }
}
