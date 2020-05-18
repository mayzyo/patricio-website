using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace PatricioPersonal.Utilities
{
    class ResourceHubBlobStorageHelper : IBlobStorageHelper
    {
        private readonly string area;
        private readonly string connectionString;
        private HttpClient clientObj;
        private HttpClient Client
        {
            get
            {
                if (clientObj == null)
                {
                    clientObj = new HttpClient
                    {
                        BaseAddress = new Uri("http://47.115.53.47:42882")
                    };

                    // Using the base64 string directly in the Environment Variable
                    // byte[] bytes = Encoding.UTF8.GetBytes(connectionString);
                    // string base64 = Convert.ToBase64String(bytes);
                    // clientObj.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", connectionString);
                }

                return clientObj;
            }
        }

        public ResourceHubBlobStorageHelper(IConfiguration Configuration, string area)
        {
            this.connectionString = Configuration.GetConnectionString("BlobStorage");
            this.area = area.ToLower();
            //connectionString = Environment.GetEnvironmentVariable("RESOURCE_HUB_CONNECTION_STRING");
        }

        public Task<Stream> Download(string key)
        {
            var response = Client.GetAsync($"?fileName={key}&containerName={area}");
            return response.Result.Content.ReadAsStreamAsync();
        }

        public BlobClient Fetch(string key)
        {
            throw new NotImplementedException();
        }
    }
}
