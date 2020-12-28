using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Media
    {
        public enum MediaType
        {
            IMAGE,
            AUDIO,
            VIDEO
        }

        public int Id { get; set; }
        public string Preview { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public MediaType Type { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public int? SongId { get; set; }
        [ForeignKey("SongId")]
        public Song Song { get; set; }
        public int? PostId { get; set; }
        [ForeignKey("PostId")]
        public Post Post { get; set; }
        public int? ArticleId { get; set; }
        [ForeignKey("ArticleId")]
        public Article Article { get; set; }
        public int? AlbumId { get; set; }
        [ForeignKey("AlbumId")]
        public Album Album { get; set; }
    }
}
