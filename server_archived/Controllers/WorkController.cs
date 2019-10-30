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
    public class WorkController : Controller
    {
        private const string db_id = "patriciochan";

        private readonly IExcelDatabase database;
        private readonly IManifest manifest;

        public WorkController(IManifest manifest, IExcelDatabase database)
        {
            this.database = database;
            this.manifest = manifest;
        }

        public IEnumerable<Music> Index(Locale lang = Locale.EN)
        {
            database.driveAccess = manifest[db_id][lang];
            return database.FetchTable<Music>("WORK");
        }
    }
}
