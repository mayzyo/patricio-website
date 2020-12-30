using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Admin.Models
{
    public class User : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        public bool IsOwner { get; set; }
        [Required]
        public string Email { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string Weixin { get; set; }
    }
}
