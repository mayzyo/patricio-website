using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIServer.Utilities;

namespace APIServer.Areas.Content.Models
{
    public class Article : BaseEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public Song? Song { get; set; }
        public ICollection<Media>? Gallery { get; set; }
    }
}