using Microsoft.EntityFrameworkCore;
using PatricioPersonal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Data
{
    public class PatricioPersonalDbContext : DbContext
    {
        public DbSet<Music> PatricioPersonalMusics { get; set; }
        public DbSet<Update> PatricioPersonalUpdates { get; set; }
        public DbSet<Moment> PatricioPersonalMoments { get; set; }
        public DbSet<Article> PatricioPersonalArticles { get; set; }
        public PatricioPersonalDbContext(DbContextOptions<PatricioPersonalDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Music>(entity =>
            {
                entity.HasOne(p => p.Article)
                     .WithOne()
                     .HasForeignKey<Music>(a => a.ArticleId);
            });
        }
    }
}
