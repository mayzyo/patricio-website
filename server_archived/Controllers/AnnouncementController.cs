using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DestinesiaWeb;
using DestinesiaWeb.Utilties;
using Microsoft.AspNetCore.Mvc;
using PatricioPersonal.Models;

namespace PatricioPersonal.Controllers
{
    [Route("{api:PatricioPersonal}/[controller]")]
    public class AnnouncementController : Controller
    {
        private const string db_id = "patriciochan";

        private readonly IExcelDatabase database;
        private readonly IManifest manifest;

        public AnnouncementController(IManifest manifest, IExcelDatabase database)
        {
            this.database = database;
            this.manifest = manifest;
        }

        [HttpGet("[action]")]
        public IEnumerable<Announcement> Latest(int page, int size, Locale lang = Locale.EN)
        {
            database.driveAccess = manifest[db_id][lang];
            return database.FetchTable<Announcement>("ANNOUNCEMENT")
                .OrderByDescending(el => el.create_date)
                .Skip((page - 1) * size)
                .Take(size);
        }

        [HttpGet("[action]")]
        public IEnumerable<Announcement> Events(int page, int size, Locale lang = Locale.EN)
        {
            database.driveAccess = manifest[db_id][lang];
            return database.FetchTable<Announcement>("ANNOUNCEMENT")
                .Where(el => el.link != null)
                .OrderByDescending(el => el.create_date)
                .Skip((page - 1) * size)
                .Take(size);
        }
    }
}
