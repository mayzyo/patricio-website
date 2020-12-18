using MaximeRouiller.Azure.AppService.EasyAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PatricioPersonal.Data;
using PatricioPersonal.Utilities;
// CI test
namespace PatricioPersonal
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddScoped<ImageHelper>();
            // Custom extensions setup
            services.AddBlobStorage(Configuration);
            // If using Kestrel:
            services.Configure<KestrelServerOptions>(options => options.AllowSynchronousIO = true);
            // If using IIS:
            services.Configure<IISServerOptions>(options => options.AllowSynchronousIO = true);

            services.AddRouting();
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            // services.AddGeolocations(options =>
            // {
            //     options.locales.Add("CN", new List<string>
            //     {
            //         "destinesiastudio.cn", 
            //         "michael.destinesiastudio.cn",
            //     });
            //     options.redirectURLs.Add("destinesiastudio.cn", "destinesiahub-destinesiastudio.azurewebsites.net");
            //     options.redirectURLs.Add("michael.destinesiastudio.cn", "michael.destinesiastudio.com.au");
            //     options.isInclusive = false;
            // });
            // Entity Core setup
            services.AddDbContext<ProfileDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DestinesiahubDb"))
            );
            services.AddDbContext<PatricioPersonalDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DestinesiahubDb"))
            );

            // EasyAuth setup
            services.AddAuthentication().AddEasyAuthAuthentication((o) => { });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // Reference - https://stackoverflow.com/questions/50163351/asp-net-core-behind-nginx-with-http2-remote-ip-always-127-0-0-1
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                ForwardedHeaders.XForwardedProto
            });  
            // app.UseGeoRedirection();

            // app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
