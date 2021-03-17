using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    // "[Required]" is used because ASP OpenAPI doesn't seem to support NRT (the question mark thing) yet.
    public class Song : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Genre { get; set; }
        public string? SoundCloud { get; set; }
        public string? Audio { get; set; }
        [Required]
        public Album Album { get; set; }
        public TopSong? TopSong { get; set; }
        [IgnoreDataMember]
        public int? ArticleId { get; set; }
        public Article? Article { get; set; }
    }
}