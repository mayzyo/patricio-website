using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PatricioPersonal.Data;
using PatricioPersonal.Models;
using PatricioPersonal.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Authorization;

namespace PatricioPersonal.Controllers
{
#if !DEBUG
    [Authorize(AuthenticationSchemes = "EasyAuth")]
#endif
    [ApiController]
    [Route("[controller]")]
    public class UpdatesController : ControllerBase
    {
        private readonly PatricioPersonalDbContext context;
        private readonly IBlobStorageHelper blobStorage;
        private readonly ImageHelper imageHelper;

        public UpdatesController(
            PatricioPersonalDbContext context,
            BlobStorageHelperResolver blobStorageResolver,
            ImageHelper imageHelper
        )
        {
            this.context = context;
            this.imageHelper = imageHelper;
            blobStorage = blobStorageResolver("PatricioPersonal");
        }

        [AllowAnonymous]
        public IEnumerable<Update> Index(string filter, int page = 1, int size = 10)
        {
            var filterEnum = filter != null ? (Filter)Enum.Parse(typeof(Filter), filter) : Filter.ALL;
            IEnumerable<Update> sortedUpdates;

            if (filterEnum == Filter.EVENT)
                sortedUpdates = context.PatricioPersonalUpdates.Where(el => el.Link != null);
            else if(filterEnum == Filter.POST)
                sortedUpdates = context.PatricioPersonalUpdates.Where(el => el.Link == null);
            else
                sortedUpdates = context.PatricioPersonalUpdates;

            return sortedUpdates.OrderByDescending(el => el.Date).Skip((page - 1) * size).Take(size);
        }

        // ADMINSTRATION

        [HttpPost("previews")]
        public async Task<ActionResult<string>> UploadPreview()
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            using var reqStream = Request.Body;
            if (reqStream == null) return BadRequest("File stream is empty.");

            var previewKey = $"UPDATE_PREVIEW_{DateTime.Now.Ticks.ToString()}";
            using var memStream = imageHelper.ResizeImage(reqStream, 2000);

            try
            {
                await blobStorage.Fetch(previewKey).UploadAsync(memStream);
                return previewKey;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Update>> PostUpdate(Update update)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            if (update.Thumbnail != null && BuildThumbnail(update.Thumbnail, out string thumbnail))
                update.Thumbnail = thumbnail;

            context.PatricioPersonalUpdates.Add(update);
            await context.SaveChangesAsync();
            return await context.PatricioPersonalUpdates.FindAsync(update.Id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutUpdate(int id, Update update)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();
            if (id != update.Id) return BadRequest("ID mismatch.");

            if(update.Thumbnail != null && BuildThumbnail(update.Thumbnail, out string thumbnail))
                update.Thumbnail = thumbnail;

            context.Entry(update).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UpdateExists(update.Id)) 
                    NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUpdate(int id)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            var update = await context.PatricioPersonalUpdates.FindAsync(id);
            if (update == null) return NotFound();

            context.PatricioPersonalUpdates.Remove(update);
            await context.SaveChangesAsync();
            return NoContent();
        }

        private bool BuildThumbnail(string key, out string thumbnail)
        {
            thumbnail = null;
            if (key.StartsWith("data:image")) return false;

            try
            {
                var client = blobStorage.Fetch(key);
                BlobDownloadInfo download = client.Download();
                using var memStream = imageHelper.ResizeImage(download.Content, 100);
                download.Content.Dispose();
                thumbnail = imageHelper.ConvertToBase64(memStream.ToArray());
                client.Delete();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private bool UpdateExists(int id)
        {
            return context.PatricioPersonalUpdates.Any(e => e.Id == id);
        }

        enum Filter
        {
            ALL,
            EVENT,
            POST
        }
    }
}