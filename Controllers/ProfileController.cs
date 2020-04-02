using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PatricioPersonal.Data;
using PatricioPersonal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PatricioPersonal.Controllers
{
#if !DEBUG
    [Authorize(AuthenticationSchemes = "EasyAuth")]
#endif
    [ApiController]
    [Route("[controller]")]
    public class ProfileController : Controller
    {
        private readonly ProfileDbContext context;

        public ProfileController(ProfileDbContext context)
        {
            this.context = context;
        }

        [AllowAnonymous]
        public async Task<Owner> Index()
        {
             return await FindCreate();
        }

        // ADMINISTRATION

        [HttpPut("[action]")]
        public async Task<ActionResult> Media(SocialMedia socialMedia)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();
            context.Entry(socialMedia).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await context.OwnerExists("PatricioPersonal"))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        private async Task<Owner> FindCreate()
        {
            if (!await context.OwnerExists("PatricioPersonal"))
            {
                context.Owners.Add(new Owner { Area = "PatricioPersonal", SocialMedia = new SocialMedia() });
                await context.SaveChangesAsync();
            }

            return context["PatricioPersonal"];
        }
    }
}
