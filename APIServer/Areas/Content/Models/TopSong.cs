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
    public class TopSong : BaseEntity
    {
        public int Id { get; set; }
        public ushort? Rank { get; set; }
        [IgnoreDataMember]
        public int SongId { get; set; }
        [Required]
        public Song Song { get; set; } = new Song();
    }
}