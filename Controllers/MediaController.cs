using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Azure.Storage.Blobs.Models;
using PatricioPersonal.Data;
using PatricioPersonal.Models;
using PatricioPersonal.Utilities;
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
    public class MediaController : ControllerBase
    {
        private readonly PatricioPersonalDbContext context;
        private readonly IBlobStorageHelper blobStorage;
        private readonly ImageHelper imageHelper;

        public MediaController(
            PatricioPersonalDbContext context,
            BlobStorageHelperResolver blobStorageResolver,
            ImageHelper imageHelper
        )
        {
            this.context = context;
            this.imageHelper = imageHelper;
            blobStorage = blobStorageResolver(Environment.GetEnvironmentVariable("CONTAINER"));
        }

        [HttpGet("moments")]
        [AllowAnonymous]
        public IEnumerable<Moment> Moments(int page = 1, int size = 10)
        {
            return context.PatricioPersonalMoments
                .OrderByDescending(el => el.Date)
                .Skip((page - 1) * size)
                .Take(size);
        }

        [HttpGet("images/{key}")]
        [AllowAnonymous]
        public async Task<FileResult> Image(string key)
        {
            try
            {
                return File(await blobStorage.Download(key), MediaTypeNames.Image.Jpeg);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // ADMINSTRATION

        [HttpPost("images")]
        public async Task<ActionResult<string>> UploadImage()
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            using var reqStream = Request.Body;
            if (reqStream == null) return BadRequest("File stream is empty.");

            var imageKey = $"MEDIA_{DateTime.Now.Ticks.ToString()}";
            using var memStream = imageHelper.ResizeImage(reqStream, 2000);

            try
            {
                await blobStorage.Fetch(imageKey).UploadAsync(memStream);
                return imageKey;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost("moments")]
        public async Task<ActionResult<Moment>> PostMoment(Moment moment)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            if (moment.ImageKey != null)
            {
                if (!BuildThumbnail(moment.ImageKey, out string thumbnail))
                    return Conflict("Key already exists.");
                moment.Thumbnail = thumbnail;
            }

            context.PatricioPersonalMoments.Add(moment);
            await context.SaveChangesAsync();
            return await context.PatricioPersonalMoments.FindAsync(moment.Id);
        }

        [HttpPut("moments/{id}")]
        public async Task<ActionResult> PutMoment(int id, Moment moment)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();
            if (id != moment.Id) return BadRequest("ID mismatch.");

            if (moment.ImageKey != null)
            {
                BuildThumbnail(moment.ImageKey, out string thumbnail);
                if (thumbnail != null)
                    moment.Thumbnail = thumbnail;
            }

            context.Entry(moment).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MomentExists(moment.Id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("moments/{id}")]
        public async Task<ActionResult> DeleteMoment(int id)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            var moment = await context.PatricioPersonalMoments.FindAsync(id);
            if (moment == null) return NotFound();

            context.PatricioPersonalMoments.Remove(moment);
            await context.SaveChangesAsync();
            return NoContent();
        }

        private bool BuildThumbnail(string key, out string thumbnail)
        {
            thumbnail = null;
            if (context.PatricioPersonalMoments.Any(e => e.ImageKey == key)) return false;

            try
            {
                BlobDownloadInfo download = blobStorage.Fetch(key).Download();
                using var memStream = imageHelper.ResizeImage(download.Content, 100);
                download.Content.Dispose();
                thumbnail = imageHelper.ConvertToBase64(memStream.ToArray());
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private bool MomentExists(int id)
        {
            return context.PatricioPersonalMoments.Any(e => e.Id == id);
        }
    }
}