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
        private readonly ContentContext _context;

        public ArticlesController(ContentContext context)
        {
            _context = context;
        }

        // GET: /Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetPatricioPersonalArticles()
        {
            return await _context.PatricioPersonalArticles.ToListAsync();
        }

        // GET: /Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _context.PatricioPersonalArticles.FindAsync(id);

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

            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
            _context.PatricioPersonalArticles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticle", new { id = article.Id }, article);
        }

        // DELETE: /Articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await _context.PatricioPersonalArticles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.PatricioPersonalArticles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticleExists(int id)
        {
            return _context.PatricioPersonalArticles.Any(e => e.Id == id);
        }
    }
}
