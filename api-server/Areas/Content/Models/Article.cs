using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using APIServer.Areas.Admin.Models;

namespace APIServer.Areas.Content.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public int? SongId { get; set; }
        [ForeignKey("SongId")]
        public Song Song { get; set; }
    }
}