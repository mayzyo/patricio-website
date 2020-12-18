using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PatricioPersonal.Models
{
    public class Moment
    {
        public int Id { get; set; }
        public string Thumbnail { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string ImageKey { get; set; }
    }
}
