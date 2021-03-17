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
    [Route("Songs/Top")]
    [ApiController]
    public class TopSongsController : ControllerBase
    {
        private readonly ContentContext context;

        public TopSongsController(ContentContext context)
        {
            this.context = context;
        }

        // GET: Songs/Top
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TopSong>>> GetPatricioPersonalTopSongs()
        {
            return await context.PatricioPersonalTopSongs
                .Include(el => el.Song)
                .Include(el => el.Song.Album)
                .OrderBy(el => el.Rank == null)
                .ThenBy(el => el.Rank)
                .ToListAsync();
        }

        // GET: Songs/Top/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TopSong>> GetTopSong(int id)
        {
            var topSong = await context.PatricioPersonalTopSongs
                .Include(el => el.Song)
                .Include(el => el.Song.Album)
                .FirstAsync(topSong => topSong.Id == id);

            if (topSong == null)
            {
                return NotFound();
            }

            return topSong;
        }

        // PUT: Songs/Top/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTopSong(int id, TopSong topSong)
        {
            if (id != topSong.Id)
            {
                return BadRequest();
            }

            topSong.Song = await context.PatricioPersonalSongs.FindAsync(topSong.Song.Id);
            context.Entry(topSong).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopSongExists(id))
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

        // POST: Songs/Top
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TopSong>> PostTopSong(TopSong topSong)
        {
            if(topSong.Rank != null && await context.PatricioPersonalTopSongs.FirstOrDefaultAsync(el => el.Rank == topSong.Rank) != null)
            {
                return BadRequest($"Rank {topSong.Rank} already exist.");
            }

            topSong.Song = await context.PatricioPersonalSongs.FindAsync(topSong.Song.Id);

            if (topSong.Song == null)
            {
                return BadRequest();
            }

            context.PatricioPersonalTopSongs.Add(topSong);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetTopSong", new { id = topSong.Id }, topSong);
        }

        // DELETE: Songs/Top/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopSong(int id)
        {
            var topSong = await context.PatricioPersonalTopSongs.FindAsync(id);
            if (topSong == null)
            {
                return NotFound();
            }

            context.PatricioPersonalTopSongs.Remove(topSong);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool TopSongExists(int id)
        {
            return context.PatricioPersonalTopSongs.Any(e => e.Id == id);
        }
    }
}
