using APIServer.Areas.Metric.Data;
using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Metric.Models
{
    public class Email : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Message { get; set; }
        public string Title { get; set; }
        public string Template { get; set; }
        public bool IsSuccess { get; set; }
        public User User { get; set; }
    }
}
