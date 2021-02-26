using APIServer.Areas.Content.Models;
using APIServer.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace APIServer.Areas.Content.Data
{
    public class ContentContext : BaseContext
    {
        public DbSet<Song> PatricioPersonalSongs { get; set; }
        public DbSet<Album> PatricioPersonalAlbums { get; set; }
        public DbSet<Post> PatricioPersonalPosts { get; set; }
        public DbSet<Article> PatricioPersonalArticles { get; set; }
        public DbSet<Media> PatricioPersonalMedia { get; set; }
        public DbSet<Gallery> PatricioPersonalGallery { get; set; }

        public ContentContext(DbContextOptions<ContentContext> options) : base(options)
        {

        }
    }
}
