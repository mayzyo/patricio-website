using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Models
{
    public class SocialMedia
    {
        public int Id { get; set; }
        public string Biography { get; set; }
        public string Facebook { get; set; }
        public string LinkedIn { get; set; }
        public string Instagram { get; set; }
        public string WeChat { get; set; }
        public string Weibo { get; set; }
        public int OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public Owner Owner { get; set; }
    }
}
