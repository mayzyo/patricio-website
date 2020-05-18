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
    public class MusicsController : ControllerBase
    {
        private readonly PatricioPersonalDbContext context;
        private readonly IBlobStorageHelper blobStorage;
        private readonly ImageHelper imageHelper;

        public MusicsController(
            PatricioPersonalDbContext context, 
            BlobStorageHelperResolver blobStorageResolver,
            ImageHelper imageHelper
        )
        {
            this.context = context;
            this.imageHelper = imageHelper;
            blobStorage = blobStorageResolver(Environment.GetEnvironmentVariable("Container"));
        }

        [AllowAnonymous]
        public IEnumerable<Music> Index(string filter, int page = 1, int size = 10)
        {
            var filterEnum = filter != null ? (Filter)Enum.Parse(typeof(Filter), filter) : Filter.ALL;
            IEnumerable<Music> sortedMusics;

            if (filterEnum == Filter.FAVOURITES)
                sortedMusics = context.PatricioPersonalMusics.Include(el => el.Article).Where(el => el.Favourite);
            else
                sortedMusics = context.PatricioPersonalMusics.Include(el => el.Article);

            return sortedMusics.OrderByDescending(el => el.Date).Skip((page - 1) * size).Take(size);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<Music> Music(int id)
        {
            return await context.PatricioPersonalMusics.FindAsync(id);
        }

        [HttpGet("covers/{key}")]
        [AllowAnonymous]
        public async Task<FileResult> Covers(string key)
        //public async Task<Stream> Covers(string key)
        {
            try
            {
                //return await blobStorage.Download(key);
                return File(await blobStorage.Download(key), MediaTypeNames.Image.Jpeg);
            } catch(Exception e)
            {
                throw e;
            }            
        }

        [HttpGet("audios/{key}")]
        [AllowAnonymous]
        public async Task<FileResult> Audios(string key)
        {
            try
            {
                return File(await blobStorage.Download(key), "audio/mp3");
            } catch(Exception e)
            {
                throw e;
            }
        }

        // ADMINISTRATION

        [HttpPost("covers")]
        public async Task<ActionResult<string>> UploadCover()
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            using var reqStream = Request.Body;
            if (reqStream == null) return BadRequest("File stream is empty.");

            var coverKey = $"MUSIC_COVER_{DateTime.Now.Ticks.ToString()}";
            using var memStream = imageHelper.ResizeImage(reqStream, 2000);

            try
            {
                await blobStorage.Fetch(coverKey).UploadAsync(memStream);
                return Ok(coverKey);
            } catch(Exception e)
            {
                throw e;
            }
        }

        [HttpPost("audios")]
        public async Task<ActionResult<string>> UploadAudio()
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            using var reqStream = Request.Body;
            if (reqStream == null) return BadRequest("File stream is empty.");

            var audioKey = $"MUSIC_AUDIO_{DateTime.Now.Ticks.ToString()}";

            try
            {
                await blobStorage.Fetch(audioKey).UploadAsync(reqStream);
                return Ok(audioKey);
            } catch(Exception e)
            {
                throw e;
            }            
        }

        [HttpPost]
        public async Task<ActionResult<Music>> PostMusic(Music music)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            if (music.CoverKey != null)
            {
                if (!BuildThumbnail(music.CoverKey, out string thumbnail)) 
                    return Conflict("Key already exists.");
                music.Thumbnail = thumbnail;
            }

            if (music.AudioKey != null && !await blobStorage.Fetch(music.AudioKey).ExistsAsync())
                return Conflict("Key already exists");

            context.PatricioPersonalMusics.Add(music);
            await context.SaveChangesAsync();
            return await context.PatricioPersonalMusics.FindAsync(music.Id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutMusic(int id, Music music)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();
            if (id != music.Id) return BadRequest("ID mismatch.");

            if (music.CoverKey != null)
            {
                BuildThumbnail(music.CoverKey, out string thumbnail);
                if (thumbnail != null) 
                    music.Thumbnail = thumbnail;
            }

            if(music.Article != null)
            {
                if(music.ArticleId == null)
                {
                    context.PatricioPersonalArticles.Add(music.Article);
                    await context.SaveChangesAsync();
                    music.ArticleId = music.Article.Id;
                } else
                {
                    context.Entry(music.Article).State = EntityState.Modified;
                }
            }
            context.Entry(music).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MusicExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMusic(int id)
        {
            if (!this.PrincipalAccepted()) return Unauthorized();

            var music = await context.PatricioPersonalMusics.FindAsync(id);
            if (music == null) return NotFound();

            context.PatricioPersonalMusics.Remove(music);

            if (music.ArticleId != null)
            {
                var article = await context.PatricioPersonalArticles.FindAsync(music.ArticleId);
                context.PatricioPersonalArticles.Remove(article);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }

        private bool BuildThumbnail(string key, out string thumbnail)
        {
            thumbnail = null;
            if (context.PatricioPersonalMusics.Any(e => e.CoverKey == key)) return false;

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

        private bool MusicExists(int id)
        {
            return context.PatricioPersonalMusics.Any(e => e.Id == id);
        }

        enum Filter
        {
            ALL,
            FAVOURITES
        }
    }
}