using APIServer.Areas.Metric.Models;
using APIServer.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Metric.Data
{
    public class MetricContext : BaseContext
    {
        public DbSet<Email> PatricioPersonalEmails { get; set; }
        public DbSet<User> PatricioPersonalUsers { get; set; }

        public MetricContext(DbContextOptions<MetricContext> options) : base(options)
        {

        }
    }
}
