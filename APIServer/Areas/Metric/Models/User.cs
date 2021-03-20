using APIServer.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Metric.Models
{
    public class User : BaseEntity
    {
        public int Id { get; set; }
        public string IpAddress { get; set; }
    }
}
