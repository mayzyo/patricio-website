using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Media : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public MediaType Type { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public ICollection<Gallery> Gallery { get; set; }

        public enum MediaType
        {
            IMAGE,
            AUDIO,
            VIDEO
        }
    }
}
