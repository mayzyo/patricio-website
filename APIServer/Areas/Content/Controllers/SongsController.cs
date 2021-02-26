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
    public class SongsController : ControllerBase
    {
        private readonly MusicContext context;

        public SongsController(MusicContext context)
        {
            this.context = context;
        }

        // GET: /Songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongs(int page = 1, int size = 10)
        {
            return await context.PatricioPersonalSongs
                .OrderByDescending(el => el.Created)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
            //return await _context.PatricioPersonalSongs.ToListAsync();
        }

        // GET: /Songs/Highlights
        [HttpGet("Highlights")]
        public async Task<ActionResult<IEnumerable<Song>>> GetHighlights()
        {
            return await context
                .PatricioPersonalSongs
                .Where(el => el.IsHighlight)
                .ToListAsync();
        }

        // GET: /Songs/Genre/Classical
        [HttpGet("Genre/{option}")]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongsWithGenre(string option, int page = 1, int size = 10)
        {
            return await context
                .PatricioPersonalSongs
                .Where(el => el.Genre == option)
                .OrderByDescending(el => el.Created)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
        }

        // GET: /Songs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong(int id)
        {
            var song = await context.PatricioPersonalSongs
                .Include(el => el.Album)
                .Include(el => el.Audio)
                .FirstOrDefaultAsync(el => el.Id == id);
                            
            if (song == default(Song))
            {
                return NotFound();
            }

            return song;
        }

        // PUT: /Songs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSong(int id, Song song)
        {
            if (id != song.Id)
            {
                return BadRequest();
            }

            context.Entry(song).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SongExists(id))
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

        // POST: /Songs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Song>> PostSong(Song song)
        {
            context.PatricioPersonalSongs.Add(song);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetSong", new { id = song.Id }, song);
        }

        // DELETE: /Songs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            var song = await context.PatricioPersonalSongs.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            context.PatricioPersonalSongs.Remove(song);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool SongExists(int id)
        {
            return context.PatricioPersonalSongs.Any(e => e.Id == id);
        }
    }
}
