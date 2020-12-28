using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Song
    {
        public int Id { get; set; }
        public int? AlbumId { get; set; }
        [ForeignKey("AlbumId")]
        public Album Album { get; set; }
        [Required]
        public string Title { get; set; }
        public string Genre { get; set; }
        public string SoundCloud { get; set; }
        [Required]
        public bool IsHighlight { get; set; }
    }
}
