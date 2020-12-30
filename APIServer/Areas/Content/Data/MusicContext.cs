using APIServer.Areas.Content.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Data
{
    public class MusicContext : DbContext
    {
        public DbSet<Song> PatricioPersonalSongs { get; set; }
        public DbSet<Album> PatricioPersonalAlbums { get; set; }
        public DbSet<Media> PatricioPersonalMedia { get; set; }

        public MusicContext(DbContextOptions<MusicContext> options) : base(options)
        {

        }
    }
}
