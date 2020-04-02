using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Models
{
    public class Music
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Genre { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public string Thumbnail { get; set; }
        public string SoundCloud { get; set; }
        public string CoverKey { get; set; }
        public string AudioKey { get; set; }
        [Required]
        public bool Favourite { get; set; }
        public int? ArticleId { get; set; }
        [ForeignKey("ArticleId")]
        public Article Article { get; set; }
    }
}
