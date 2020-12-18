using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Models
{
    public class Email
    {
        public string message { get; set; }
        public string sender { get; set; }
        public Purpose purpose { get; set; }
        public Sender senderType { get; set; }
    }

    public enum Purpose
    {
        DEAL,
        OTHER
    }

    public enum Sender
    {
        DIRECTOR,
        MUSICIAN,
        OTHER
    }
}
