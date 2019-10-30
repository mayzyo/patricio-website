using System;
using System.ComponentModel.DataAnnotations;
using DestinesiaWeb.Utilties;

namespace PatricioPersonal.Models
{
    // Data Transfer Object (DTO)
    public class Music
    {
        [Column(1)]
        [Required]
        public string title { get; set; }
        [Column(2)]
        public string genre { get; set; }
        [Column(3)]
        [Required]
        public DateTime create_date { get; set; }
        [Column(4)]
        public string image { get; set; }
        [Column(5)]
        public string sound_cloud { get; set; }
    }
}
