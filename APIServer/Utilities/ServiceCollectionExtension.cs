using APIServer.BlobStorage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Utilities
{
    public static partial class ServiceCollectionExtension
    {
        public static void AddBlobStorage(this IServiceCollection services, IConfiguration Configuration)
        {
            var isChina = Environment.GetEnvironmentVariable("CHINA") != null;

            if (!isChina)
            {
                services.AddScoped<BlobStorageHelperResolver>(serviceProvider => (area) =>
                {
                    using var scope = serviceProvider.CreateScope();
                    return new AzureBlobStorageHelper(Configuration, area);
                });
            }
            else
            {
                services.AddScoped<BlobStorageHelperResolver>(serviceProvider => (area) =>
                {
                    using var scope = serviceProvider.CreateScope();
                    return new KfntechBlobStorageHelper(Configuration, area);
                });
            }
        }
    }
}
