using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using DestinesiaWeb.Utilties;

namespace PatricioPersonal.Models
{
    // Data Transfer Object (DTO)
    public class Announcement
    {
        [Column(1)]
        [Required]
        public string title { get; set; }
        [Column(2)]
        [Required]
        public string brief { get; set; }
        [Column(3)]
        public string link { get; set; }
        [Column(4)]
        public string image { get; set; }
        [Column(5)]
        [Required]
        public DateTime create_date { get; set; }
    }
}
