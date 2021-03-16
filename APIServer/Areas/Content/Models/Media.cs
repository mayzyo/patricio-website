using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Models
{
    public class Media : BaseEntity
    {
        public int Id { get; set; }
        public string Url { get; set; }
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
