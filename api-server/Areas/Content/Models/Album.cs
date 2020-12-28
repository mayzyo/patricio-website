using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Album
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Genre { get; set; }
    }
}
