using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Song : BaseEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string? SoundCloud { get; set; }
        public string? Audio { get; set; }
        public Album Album { get; set; }
        public TopSong? TopSong { get; set; }
        [IgnoreDataMember]
        public int? ArticleId { get; set; }
        public Article? Article { get; set; }
    }
}