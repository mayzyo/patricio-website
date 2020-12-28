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
    public class MediaController : ControllerBase
    {
        private readonly ContentContext _context;

        public MediaController(ContentContext context)
        {
            _context = context;
        }

        // GET: /Media
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetPatricioPersonalMedia()
        {
            return await _context.PatricioPersonalMedia.ToListAsync();
        }

        // GET: /Media/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Media>> GetMedia(int id)
        {
            var media = await _context.PatricioPersonalMedia.FindAsync(id);

            if (media == null)
            {
                return NotFound();
            }

            return media;
        }

        // PUT: /Media/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia(int id, Media media)
        {
            if (id != media.Id)
            {
                return BadRequest();
            }

            _context.Entry(media).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediaExists(id))
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

        // POST: /Media
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Media>> PostMedia(Media media)
        {
            _context.PatricioPersonalMedia.Add(media);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedia", new { id = media.Id }, media);
        }

        // DELETE: /Media/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia(int id)
        {
            var media = await _context.PatricioPersonalMedia.FindAsync(id);
            if (media == null)
            {
                return NotFound();
            }

            _context.PatricioPersonalMedia.Remove(media);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MediaExists(int id)
        {
            return _context.PatricioPersonalMedia.Any(e => e.Id == id);
        }
    }
}
