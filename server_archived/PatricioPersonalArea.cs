using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using System.IO;
using DestinesiaWeb.Utilties;

namespace PatricioPersonal
{
    public class PatricioPersonalArea
    {
        public readonly Constraint constraint = new Constraint();
        const string appFolder = "patricio-portfolio";

        public void Configuration(IApplicationBuilder app)
        {
            var fileOptions = new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{appFolder}")),
                RequestPath = "",
            };
            app.UseStaticFiles(fileOptions);
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = $"wwwroot/{appFolder}";
                spa.Options.DefaultPage = $"/{appFolder}/index.html";
            });
        }

        public class Constraint : DomainConstraint
        {
            public readonly string[] domains = new string[] {
                "kazepatriciochan.com",
                "www.kazepatriciochan.com"
            };

            protected override bool Evaluate(string hostURL)
            {
                //return true;
                return domains.Contains(hostURL);
            }
        }
    }
}
