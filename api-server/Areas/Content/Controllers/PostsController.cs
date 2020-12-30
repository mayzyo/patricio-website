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
    public class PostsController : ControllerBase
    {
        private readonly ContentContext context;

        public PostsController(ContentContext context)
        {
            this.context = context;
        }

        // GET: /Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts(int page = 1, int size = 10)
        {
            return await context.PatricioPersonalPosts
                .OrderByDescending(el => el.Created)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
        }

        // GET: /Posts/Events
        [HttpGet("Events")]
        public async Task<ActionResult<IEnumerable<Post>>> GetEvents(int page = 1, int size = 10)
        {
            return await context.PatricioPersonalPosts
                .Where(el => el.IsEvent)
                .OrderByDescending(el => el.Created)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
        }

        // GET: /Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await context.PatricioPersonalPosts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: /Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            context.Entry(post).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
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

        // POST: /Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            context.PatricioPersonalPosts.Add(post);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: /Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await context.PatricioPersonalPosts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            context.PatricioPersonalPosts.Remove(post);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return context.PatricioPersonalPosts.Any(e => e.Id == id);
        }
    }
}
