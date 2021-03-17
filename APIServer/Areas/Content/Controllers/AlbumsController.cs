using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIServer.Areas.Content.Data;
using APIServer.Areas.Content.Models;

namespace APIServer.Areas.Content.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private readonly ContentContext context;

        public AlbumsController(ContentContext context)
        {
            this.context = context;
        }

        // GET: /Albums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Album>>> GetAlbums()
        {
            return await context.PatricioPersonalAlbums.ToListAsync();
        }

        // GET: /Albums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum(int id)
        {
            var album = await context.PatricioPersonalAlbums
                .Include(el => el.Songs)
                .FirstOrDefaultAsync(el => el.Id == id);

            if (album == default(Album))
            {
                return NotFound();
            }

            return album;
        }

        // PUT: /Albums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbum(int id, Album album)
        {
            if (id != album.Id)
            {
                return BadRequest();
            }

            context.Entry(album).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: /Albums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Album>> PostAlbum(Album album)
        {
            context.PatricioPersonalAlbums.Add(album);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetAlbum", new { id = album.Id }, album);
        }

        // DELETE: /Albums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            var album = await context.PatricioPersonalAlbums.FindAsync(id);
            if (album == null)
            {
                return NotFound();
            }

            context.PatricioPersonalAlbums.Remove(album);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlbumExists(int id)
        {
            return context.PatricioPersonalAlbums.Any(e => e.Id == id);
        }
    }
}
