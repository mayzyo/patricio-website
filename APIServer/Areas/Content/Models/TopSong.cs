using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class TopSong : BaseEntity
    {
        public int Id { get; set; }
        public ushort? Rank { get; set; }
        [IgnoreDataMember]
        public int SongId { get; set; }
        public Song Song { get; set; }
    }
}