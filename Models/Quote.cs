using System;
using System.Collections.Generic;
using System.Text;

namespace PatricioPersonal.Models
{
    public class Quote
    {
        public string Message { get; set; }
        public string Author { get; set; }
        public string Keywords { get; set; }
        public string Profession { get; set; }
        public string Nationality { get; set; }
        public DateTime AuthorBirth { get; set; }
        public DateTime AuthorDeath { get; set; }
    }
}
