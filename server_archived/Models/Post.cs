using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using DestinesiaWeb.Utilties;

namespace PatricioPersonal.Models
{
    // Data Transfer Object (DTO)
    public class Post
    {
        [Column(1)]
        [Required]
        public string title { get; set; }
        [Column(2)]
        [Required]
        public string document { get; set; }
        [Column(3)]
        [Required]
        public DateTime create_date { get; set; }
    }
}
