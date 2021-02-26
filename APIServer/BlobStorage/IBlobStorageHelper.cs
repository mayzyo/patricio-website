using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.BlobStorage
{
    public delegate IBlobStorageHelper BlobStorageHelperResolver(string area);

    public interface IBlobStorageHelper
    {
        BlobClient Fetch(string key);
        Task<Stream> Download(string key);
    }
}
