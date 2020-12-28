using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Post
    {
        public int Id { get; set; }
        [Required]
        public string Heading { get; set; }
        public string Body { get; set; }
        [Required]
        public bool IsEvent { get; set; }
        public string EventUrl { get; set; }
    }
}
