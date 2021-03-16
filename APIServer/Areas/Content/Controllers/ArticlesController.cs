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
    public class ArticlesController : ControllerBase
    {
        private readonly ContentContext context;

        public ArticlesController(ContentContext context)
        {
            this.context = context;
        }

        // GET: /Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return await context.PatricioPersonalArticles.ToListAsync();
        }

        // GET: /Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await context.PatricioPersonalArticles
                .Include(el => el.Gallery)
                .Include(el => el.Song)
                .FirstOrDefaultAsync(el => el.Id == id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // PUT: /Articles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }

            context.Entry(article).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
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

        // POST: /Articles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
            if(article.Song != null)
            {
                if(article.Song.Id != 0)
                {
                    article.Song = await context.PatricioPersonalSongs.FindAsync(article.Song.Id);
                } else
                {
                    return BadRequest("Cannot create new song from article creation.");
                }
            }

            context.PatricioPersonalArticles.Add(article);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetArticle", new { id = article.Id }, article);
        }

        // DELETE: /Articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await context.PatricioPersonalArticles
                .Include(el => el.Gallery)
                .Include(el => el.Song)
                .FirstOrDefaultAsync(el => el.Id == id);

            if (article == null)
            {
                return NotFound();
            }

            if (article.Gallery != null)
            {
                foreach (var media in article.Gallery)
                {
                    context.PatricioPersonalMedia.Remove(media);
                }
            }

            if(article.Song != null)
            {
                article.Song.Article = null;
                context.Entry(article.Song).State = EntityState.Modified;
            }

            context.PatricioPersonalArticles.Remove(article);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticleExists(int id)
        {
            return context.PatricioPersonalArticles.Any(e => e.Id == id);
        }
    }
}
