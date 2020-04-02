using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Models
{
    public class Owner
    {
        public int Id { get; set; }
        public string Area { get; set; }
        public string Email { get; set; }
        public SocialMedia SocialMedia { get; set; }
    }
}
