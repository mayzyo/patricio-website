using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PatricioPersonal.Models;
using DocumentFormat.OpenXml.Packaging;
using OpenXmlPowerTools;
using System.Xml.Linq;
using System.Drawing.Imaging;
using DestinesiaWeb.Utilties;
using DestinesiaWeb;

namespace PatricioPersonal.Controllers
{
    [Route("{api:PatricioPersonal}/[controller]")]
    public class BlogController : Controller
    {
        private const string db_id = "patriciochan";

        private readonly IExcelDatabase database;
        private readonly IManifest manifest;

        public BlogController(IManifest manifest, IExcelDatabase database)
        {
            this.database = database;
            this.manifest = manifest;
        }

        [HttpGet("[action]")]
        public IEnumerable<Post> Latest(int page, int size, Locale lang = Locale.EN)
        {
            database.driveAccess = manifest[db_id][lang];
            return database.FetchTable<Post>("POST")
                .OrderByDescending(el => el.create_date)
                .Skip((page - 1) * size)
                .Take(size);
        }

        [HttpGet("[action]")]
        public string Article(string title, Locale lang = Locale.EN)
        {
            database.driveAccess = manifest[db_id][lang];
            var arr = database.FetchTable<Post>("POST");
            var validPost = arr.Where(el => el.title == title);
            if (validPost.Count() == 0)
            {
                return null;
            }

            using (WebClient client = new WebClient())
            {
                var binary = client.DownloadData(GoogleDrive.CreateUri(validPost.First().document));
                return new DocumentReader().FetchDocument(binary);
            }
        }
    }
}
