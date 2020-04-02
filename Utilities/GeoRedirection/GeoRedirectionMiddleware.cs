using MaxMind.GeoIP2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Utilities.GeoRedirection
{
    public class GeoRedirectionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly RewriteOptions options;

        public GeoRedirectionMiddleware(RequestDelegate next, RewriteOptions options)
        {
            this.next = next;
            this.options = options;
        }

        // Services in DI Container can be injected here
        public async Task Invoke(HttpContext context, GeoRedirectionOptions configurationOptions)
        {
// #if !DEBUG
//             string remoteIP = context.Connection.RemoteIpAddress.ToString();
//             using var reader = new DatabaseReader("wwwroot/GeoIP/GeoLite2-Country.mmdb");
//             var response = reader.Country(remoteIP);

//             if (response != null && configurationOptions.locales.ContainsKey(response.Country.IsoCode) == configurationOptions.isInclusive)
//             {
//                 string hostURL = context.Request.Host.Host;
//                 if (configurationOptions.locales["CN"].Contains(hostURL))
//                 {
//                     options.AddRedirect("(.*)", $"http://{configurationOptions.redirectURLs[hostURL]}");
//                 }
//             }
// #endif

            await next(context);
        }
    }
}
