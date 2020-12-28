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
        private readonly MusicContext _context;

        public SongsController(MusicContext context)
        {
            _context = context;
        }

        // GET: /Songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetPatricioPersonalSongs()
        {
            return await _context.PatricioPersonalSongs.ToListAsync();
        }

        // GET: /Songs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong(int id)
        {
            var song = await _context.PatricioPersonalSongs.FindAsync(id);

            if (song == null)
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

            _context.Entry(song).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
            _context.PatricioPersonalSongs.Add(song);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSong", new { id = song.Id }, song);
        }

        // DELETE: /Songs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            var song = await _context.PatricioPersonalSongs.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            _context.PatricioPersonalSongs.Remove(song);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SongExists(int id)
        {
            return _context.PatricioPersonalSongs.Any(e => e.Id == id);
        }
    }
}
