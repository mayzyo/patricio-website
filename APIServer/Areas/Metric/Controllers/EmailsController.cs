using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIServer.Areas.Metric.Data;
using APIServer.Areas.Metric.Models;

namespace APIServer.Areas.Metric.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmailsController : ControllerBase
    {
        private readonly MetricContext context;

        public EmailsController(MetricContext context)
        {
            this.context = context;
        }

        // GET: /Emails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Email>>> GetEmails()
        {
            return await context.PatricioPersonalEmails.ToListAsync();
        }

        // GET: /Emails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Email>> GetEmail(int id)
        {
            var email = await context.PatricioPersonalEmails
                .Include(el => el.Id == id)
                .FirstOrDefaultAsync();

            if (email == default(Email))
            {
                return NotFound();
            }

            return email;
        }

        // PUT: /Emails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmail(int id, Email email)
        {
            if (id != email.Id)
            {
                return BadRequest();
            }

            context.Entry(email).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmailExists(id))
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

        // POST: /Emails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Email>> PostEmail(Email email)
        {
            context.PatricioPersonalEmails.Add(email);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetEmail", new { id = email.Id }, email);
        }

        // DELETE: /Emails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmail(int id)
        {
            var email = await context.PatricioPersonalEmails.FindAsync(id);
            if (email == null)
            {
                return NotFound();
            }

            context.PatricioPersonalEmails.Remove(email);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmailExists(int id)
        {
            return context.PatricioPersonalEmails.Any(e => e.Id == id);
        }
    }
}
