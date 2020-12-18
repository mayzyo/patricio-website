using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Utilities.GeoRedirection
{
    public class GeoRedirectionOptions
    {
        public readonly IDictionary<string, IList<string>> locales = new Dictionary<string, IList<string>>();
        public readonly IDictionary<string, string> redirectURLs = new Dictionary<string, string>();
        public bool isInclusive = true;
    }
}
