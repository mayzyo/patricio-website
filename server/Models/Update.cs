using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Models
{
    public class Update
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string Thumbnail { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
