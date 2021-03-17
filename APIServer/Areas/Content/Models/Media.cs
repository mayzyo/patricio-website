using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    // "[Required]" is used because ASP OpenAPI doesn't seem to support NRT (the question mark thing) yet.
    public class Media : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public MediaType Type { get; set; }
        public Post? Post { get; set; }
        public Article? Article { get; set; }

        public enum MediaType
        {
            IMAGE,
            VIDEO
        }
    }
}
