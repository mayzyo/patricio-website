using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Admin.Models
{
    public class Email
    {
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

        public int Id { get; set; }
        [Required]
        public string Address { get; set; }
        public string Message { get; set; }
        public EmailPurpose Purpose { get; set; }
        public SenderType Sender { get; set; }
        [Required]
        public bool IsSuccess { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
