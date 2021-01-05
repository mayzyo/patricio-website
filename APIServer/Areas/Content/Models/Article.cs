using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using APIServer.Areas.Admin.Models;
using APIServer.Utilities;

namespace APIServer.Areas.Content.Models
{
    public class Article : BaseEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public int? SongId { get; set; }
        public Song Song { get; set; }
    }
}