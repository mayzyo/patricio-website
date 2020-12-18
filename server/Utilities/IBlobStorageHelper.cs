using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Utilities
{
    public delegate IBlobStorageHelper BlobStorageHelperResolver(string area);

    public interface IBlobStorageHelper
    {
        BlobClient Fetch(string key);
        Task<Stream> Download(string key);
    }

    public static partial class ServiceCollectionExtensions
    {
        public static void AddBlobStorage(this IServiceCollection services, IConfiguration Configuration)
        {
            var isChina = Environment.GetEnvironmentVariable("CHINA") != null;

            if (!isChina)
            {
                services.AddScoped<BlobStorageHelperResolver>(serviceProvider => (container) =>
                {
                    using var scope = serviceProvider.CreateScope();
                    return new AzureBlobStorageHelper(Configuration, container);
                });
            }
            else
            {
                services.AddScoped<BlobStorageHelperResolver>(serviceProvider => (container) =>
                {
                    using var scope = serviceProvider.CreateScope();
                    return new ResourceHubBlobStorageHelper(Configuration, container);
                });
            }
        }
    }
}
