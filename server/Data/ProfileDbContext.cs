using PatricioPersonal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Data
{
    public class ProfileDbContext : DbContext
    {
        public DbSet<Owner> Owners { get; set; }

        public ProfileDbContext(DbContextOptions<ProfileDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Owner>()
                .HasIndex(u => u.Area)
                .IsUnique();
        }

        public Owner this[string area]
        {
            get { return Owners.Include(el => el.SocialMedia).First(el => el.Area == area); }
        }

        public async Task<bool> OwnerExists(string area)
        {
            return await Owners.AnyAsync(e => e.Area == area);
        }
    }
}
