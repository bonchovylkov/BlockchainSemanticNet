using Ipfs;
using Ipfs.Api;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TSNet.Services
{
    public class IpfsService : IIpfsService
    {
        IpfsClient ipfs;

        public IpfsService()
        {
            string host = "http://localhost:5001";
            //"http://ipv4.fiddler:5001"
            this.ipfs = new IpfsClient(host);
        }

        public async Task<IDataBlock> GetAsync(Cid id, CancellationToken cancel = default(CancellationToken)) // TODO CID support
        {
            var data = await ipfs.DownloadBytesAsync("block/get", cancel, id);
            return new Block
            {
                DataBytes = data,
                Id = id
            };
        }

        public async Task<Cid> PutAsync(
            byte[] data,
            string contentType = Cid.DefaultContentType,
            string multiHash = MultiHash.DefaultAlgorithmName,
            bool pin = false,
            CancellationToken cancel = default(CancellationToken))
        {
            var options = new List<string>();
            if (multiHash != MultiHash.DefaultAlgorithmName || contentType != Cid.DefaultContentType)
            {
                options.Add($"mhtype={multiHash}");
                options.Add($"format={contentType}");
            }
            var json = await ipfs.UploadAsync("block/put", cancel, data, options.ToArray());
            var info = JObject.Parse(json);
            Cid cid = (string)info["Key"];

            if (pin)
            {
                await ipfs.Pin.AddAsync(cid, recursive: false, cancel: cancel);
            }

            return cid;
        }

        public async Task<string> PutAsync(
            Stream data,
            string contentType = Cid.DefaultContentType,
            string multiHash = MultiHash.DefaultAlgorithmName,
            bool pin = false,
            CancellationToken cancel = default(CancellationToken))
        {
            var options = new List<string>();
            //if (multiHash != MultiHash.DefaultAlgorithmName || contentType != Cid.DefaultContentType)
            //{
            //    options.Add($"mhtype={multiHash}");
            //    options.Add($"format={contentType}");
            //}

            try
            {
                string command = "add";
                var json = await ipfs.UploadAsync(command, cancel, data, null, options.ToArray());
                var info = JObject.Parse(json);
                var hash = info["Hash"].ToString();
                //Cid cid = (string)info["Key"];

                //if (pin)
                //{
                //    await ipfs.Pin.AddAsync(cid, recursive: false, cancel: cancel);
                //}

                return hash;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<IDataBlock> StatAsync(Cid id, CancellationToken cancel = default(CancellationToken))
        {
            var json = await ipfs.DoCommandAsync("block/stat", cancel, id);
            var info = JObject.Parse(json);
            return new Block
            {
                Size = (long)info["Size"],
                Id = (string)info["Key"]
            };
        }

        public async Task<Cid> RemoveAsync(Cid id, bool ignoreNonexistent = false, CancellationToken cancel = default(CancellationToken)) // TODO CID support
        {
            var json = await ipfs.DoCommandAsync("block/rm", cancel, id, "force=" + ignoreNonexistent.ToString().ToLowerInvariant());
            if (json.Length == 0)
                return null;
            var result = JObject.Parse(json);
            var error = (string)result["Error"];
            if (error != null)
                throw new HttpRequestException(error);
            return (Cid)(string)result["Hash"];
        }
    }
}
