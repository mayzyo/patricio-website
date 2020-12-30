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
        public string Preview { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public MediaType Type { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public int? SongId { get; set; }
        public Song Song { get; set; }
        public int? PostId { get; set; }
        public Post Post { get; set; }
        public int? ArticleId { get; set; }
        public Article Article { get; set; }
        public int? AlbumId { get; set; }
        public Album Album { get; set; }

        public enum MediaType
        {
            IMAGE,
            AUDIO,
            VIDEO
        }
    }
}
