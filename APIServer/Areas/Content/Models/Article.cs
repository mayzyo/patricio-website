using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using APIServer.Utilities;

namespace APIServer.Areas.Content.Models
{
    // "[Required]" is used because ASP OpenAPI doesn't seem to support NRT (the question mark thing) yet.
    public class Article : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public Song? Song { get; set; }
        public ICollection<Media>? Gallery { get; set; }
    }
}