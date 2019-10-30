using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using DestinesiaWeb;
using DestinesiaWeb.Utilties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PatricioPersonal.Models;

namespace PatricioPersonal.Controllers
{
    [Route("{api:PatricioPersonal}/[controller]")]
    public class ProfileController : Controller
    {
        private const string db_id = "patriciochan";
        private readonly IExcelDatabase database;
        private readonly IManifest manifest;
        private readonly IMemoryCache cache;

        public ProfileController(IManifest manifest, IExcelDatabase database, IMemoryCache cache)
        {
            this.database = database;
            this.manifest = manifest;
            this.cache = cache;
        }

        public Profile Index(Locale lang = Locale.EN)
        {
            database.driveAccess = manifest[db_id][lang];
            return database.FetchTable<Profile>("INFO").First();
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Quote>> Quotes()
        {
            if (!cache.TryGetValue("_QUOTES", out IList<Quote> quotes))
            {
                quotes = new List<Quote>();

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("x-rapidapi-host", "150000-quotes.p.rapidapi.com");
                    client.DefaultRequestHeaders.Add("x-rapidapi-key", "dc7b539777msh64926a0da3de288p15a2efjsn08a631c54938");
                    for (int i = 0; i < 5; i++)
                    {
                        string baseUrl = $"https://150000-quotes.p.rapidapi.com/keyword/Music";
                        using (HttpResponseMessage res = await client.GetAsync(baseUrl))
                        using (HttpContent content = res.Content)
                        {
                            string data = await content.ReadAsStringAsync();
                            quotes.Add(JsonConvert.DeserializeObject<Quote>(data));
                        }
                    }

                    cache.Set("_QUOTES", quotes, new MemoryCacheEntryOptions()
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(7),
                        Priority = CacheItemPriority.High
                    });
                }
            }

            return quotes;
        }

        [HttpGet("[action]")]
        public string Editing()
        {
            database.DisableCache(manifest[db_id]);
            return "Your changes will immediately reflect for 24 hours";
        }
    }
}
