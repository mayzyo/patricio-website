using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PatricioPersonal.Models;
using PatricioPersonal.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace PatricioPersonal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuotesController : ControllerBase
    {
        [HttpGet("[action]")]
        public IEnumerable<Quote> Random(int size = 5)
        {
            var maker = new QuoteMaker();
            return maker.Random(size);
        }
    }
}