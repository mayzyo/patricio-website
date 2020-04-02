using Azure.Core.Pipeline;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace PatricioPersonal.Utilities
{
    class AzureBlobStorageHelper : IBlobStorageHelper
    {
        private readonly string area;
        private readonly string connectionString;
        private BlobContainerClient clientObj;
        private BlobContainerClient Client
        {
            get
            {
                if (clientObj == null)
                {
                    var serviceClient = new BlobServiceClient(connectionString, new BlobClientOptions
                    { // Extend tranport duration.
                        Transport = new HttpClientTransport(new HttpClient { Timeout = TimeSpan.FromSeconds(300) })
                    });
                    clientObj = serviceClient.GetBlobContainerClient(area);
                }

                return clientObj;
            }
        }

        public AzureBlobStorageHelper(IConfiguration Configuration, string area)
        {
            this.connectionString = Configuration.GetConnectionString("BlobStorage");
            this.area = area.ToLower();
        }

        public BlobClient Fetch(string key)
        {
            return Client.GetBlobClient(key);
        }

        public async Task<Stream> Download(string key)
        {
            BlobDownloadInfo download = await Client.GetBlobClient(key).DownloadAsync();
            return download.Content;
        }
    }
}
