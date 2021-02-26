using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Post : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
        public string Link { get; set; }
        public int? GalleryId { get; set; }
        public Gallery Gallery { get; set; }
    }
}