using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using DestinesiaWeb.Utilties;

namespace PatricioPersonal.Models
{
    // Data Transfer Object (DTO)
    public class Moment
    {
        [Column(1)]
        [Required]
        public string image { get; set; }
        [Column(2)]
        public string brief { get; set; }
        [Column(3)]
        [Required]
        public DateTime create_date { get; set; }
    }
}
