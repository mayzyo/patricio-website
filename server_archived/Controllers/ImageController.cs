using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DestinesiaWeb;
using DestinesiaWeb.Utilties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using PatricioPersonal.Models;

namespace PatricioPersonal.Controllers
{
    [Route("{api:PatricioPersonal}/[controller]")]
    public class ImageController : Controller
    {
        private const string db_id = "patriciochan";

        private readonly IExcelDatabase database;
        private readonly IManifest manifest;
        private readonly IMemoryCache cache;

        public ImageController(IManifest manifest, IExcelDatabase database, IMemoryCache cache)
        {
            this.database = database;
            this.manifest = manifest;
            this.cache = cache;
        }

        [HttpGet("[action]")]
        public IEnumerable<Moment> Moments(Locale lang = Locale.EN)
        {
            database.driveAccess = manifest[db_id][lang];
            return database.FetchTable<Moment>("MOMENT").OrderByDescending(el => el.create_date);
        }

        [HttpGet("[action]")]
        public FileResult Work(string url)
        {
            database.driveAccess = manifest[db_id][Locale.EN]; 
            var validWork = database.FetchTable<Music>("WORK").Where(el => el.image == url);
            if (validWork.Count() == 0)
            {
                return null;
            }

            using(WebClient client = new WebClient())
            {
                var binary = client.DownloadData(GoogleDrive.CreateUri(validWork.First().image));
                //var bitmap = ResizeImage(binary, 1000);
                //return ConvertToDataUrl(bitmap);
                return File(binary, "image/jpg");
            }
        }

        [HttpGet("[action]")]
        public FileResult Moment(string url)
        {
            database.driveAccess = manifest[db_id][Locale.EN];
            var validMoment = database.FetchTable<Moment>("MOMENT").Where(el => el.image == url);
            if (validMoment.Count() == 0)
            {
                return null;
            }

            using (WebClient client = new WebClient())
            {
                var binary = client.DownloadData(GoogleDrive.CreateUri(validMoment.First().image));
                //var bitmap = ResizeImage(binary, 1000);
                //return ConvertToDataUrl(bitmap);
                return File(binary, "image/jpg");
            }
        }

        [HttpGet("[action]")]
        public FileResult Portrait()
        {
            database.driveAccess = manifest[db_id][Locale.EN];
            var profile = database.FetchTable<Profile>("INFO").First();

            using (WebClient client = new WebClient())
            {
                var binary = client.DownloadData(GoogleDrive.CreateUri(profile.portrait));
                //var bitmap = ResizeImage(binary, 1000);
                //return ConvertToDataUrl(bitmap);
                return File(binary, "image/jpg");
            }
        }

        // reference - https://stackoverflow.com/questions/14720929/is-there-anyway-to-display-dynamically-generated-bitmap-on-a-asp-image-control
        // reference - https://stackoverflow.com/questions/24383256/how-can-i-convert-a-jpg-file-into-a-bitmap-using-c/24383391
        // reference - https://stackoverflow.com/questions/4567328/create-thumbnails-of-images-and-store-them-in-cache?rq=1

        protected Bitmap ResizeImage(byte[] binary, int size = 50)
        {
            using (MemoryStream memStream = new MemoryStream(binary))
            {
                Image image = Image.FromStream(memStream);
                var ratio = Math.Max(image.Size.Width, image.Size.Height) / Math.Min(image.Size.Width, image.Size.Height);
                var width = image.Size.Width >= image.Size.Height ? size : image.Size.Width * ratio;
                var height = image.Size.Height >= image.Size.Width ? size : image.Size.Height * ratio;

                Bitmap bitmap = new Bitmap(image);

                Bitmap thumbBitmap = new Bitmap(width, height);
                using (Graphics g = Graphics.FromImage(thumbBitmap))
                {
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.DrawImage(bitmap, 0, 0, width, height);
                }

                return thumbBitmap;
            }
        }

        protected string ConvertToDataUrl(Bitmap bitmap)
        {
            using (MemoryStream memStream = new MemoryStream())
            {
                bitmap.Save(memStream, ImageFormat.Jpeg);
                var base64Data = Convert.ToBase64String(memStream.ToArray());

                return "data:image/jpg;base64," + base64Data;
            }
        }
    }
}
