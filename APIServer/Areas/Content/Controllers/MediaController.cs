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
        private readonly Data.ContentContext context;

        public MediaController(Data.ContentContext context)
        {
            this.context = context;
        }

        // GET: /Media
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetMedia(int page = 1, int size = 10)
        {
            return await context.PatricioPersonalMedia
                .OrderByDescending(el => el.Created)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
        }

        // GET: /Media/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Media>> GetMedia(int id)
        {
            var media = await context.PatricioPersonalMedia
                .Include(el => el.Post)
                .Include(el => el.Article)
                .FirstOrDefaultAsync(el => el.Id == id);

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

            context.Entry(media).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
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

        // DELETE: /Media/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia(int id)
        {
            var media = await context.PatricioPersonalMedia.FindAsync(id);
            if (media == null)
            {
                return NotFound();
            }

            context.PatricioPersonalMedia.Remove(media);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool MediaExists(int id)
        {
            return context.PatricioPersonalMedia.Any(e => e.Id == id);
        }
    }
}
