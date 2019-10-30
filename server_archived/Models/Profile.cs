using System.ComponentModel.DataAnnotations;
using DestinesiaWeb.Utilties;

namespace PatricioPersonal.Models
{
    // Data Transfer Object (DTO)
    public class Profile
    {
        [Column(1)]
        [Required]
        public string biography { get; set; }
        [Column(2)]
        public string occupation { get; set; }
        [Column(3)]
        public string portrait { get; set; }
        [Column(4)]
        public string facebook { get; set; }
        [Column(5)]
        public string linkedin { get; set; }
        [Column(6)]
        public string instagram { get; set; }
        [Column(7)]
        public string wechat { get; set; }
        [Column(8)]
        public string weibo { get; set; }
    }
}
