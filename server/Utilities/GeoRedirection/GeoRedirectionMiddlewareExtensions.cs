using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Utilities.GeoRedirection
{
    public static class GeoRedirectionMiddlewareExtensions
    {
        public static void AddGeolocations(this IServiceCollection services, Action<GeoRedirectionOptions> configurationOptions)
        {
            services.AddScoped(typeof(GeoRedirectionOptions), (IServiceProvider context) =>
            {
                GeoRedirectionOptions options = new GeoRedirectionOptions();
                configurationOptions(options);
                return options;
            });
        }

        public static IApplicationBuilder UseGeoRedirection(this IApplicationBuilder builder)
        {
            var options = new RewriteOptions();
            builder.UseMiddleware<GeoRedirectionMiddleware>(options);
            return builder.UseRewriter(options);
        }
    }
}
