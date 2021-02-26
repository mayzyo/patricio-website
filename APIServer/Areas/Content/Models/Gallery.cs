using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Gallery
    {
        public int Id { get; set; }
        [Required]
        public ICollection<Media> Media { get; set; }
    }
}
