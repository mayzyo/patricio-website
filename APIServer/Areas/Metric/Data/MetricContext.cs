using APIServer.Areas.Metric.Models;
using APIServer.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Metric.Data
{
    public class MetricContext : DbContext
    {
        public DbSet<Email> PatricioPersonalEmails { get; set; }
        public DbSet<User> PatricioPersonalUsers { get; set; }

        public MetricContext(DbContextOptions<MetricContext> options) : base(options)
        {

        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Email>()
        //        .Property(c => c.Purpose)
        //        .HasConversion<int>();

        //    modelBuilder.Entity<Email>()
        //        .Property(c => c.Sender)
        //        .HasConversion<int>();

        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
