using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using DestinesiaWeb.Utilties;

namespace PatricioPersonal.Models
{
    public class Quote
    {
        public string message { get; set; }
        public string author { get; set; }
        public string keywords { get; set; }
        public string profession { get; set; }
        public string nationality { get; set; }
        public string authorBirth { get; set; }
        public string authorDeath { get; set; }
    }
    //// Data Transfer Object (DTO)
    //public class Quote
    //{
    //    [Column(1)]
    //    [Required]
    //    public string text { get; set; }
    //    [Column(2)]
    //    public string author { get; set; }
    //    [Column(3)]
    //    public string link { get; set; }
    //    [Column(4)]
    //    public string is_home { get; set; }
    //}
}
