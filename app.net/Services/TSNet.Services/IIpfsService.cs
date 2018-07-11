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
   public interface IIpfsService
    {
          Task<IDataBlock> GetAsync(Cid id, CancellationToken cancel = default(CancellationToken));
        Task<Cid> PutAsync(
            byte[] data,
            string contentType = Cid.DefaultContentType,
            string multiHash = MultiHash.DefaultAlgorithmName,
            bool pin = false,
            CancellationToken cancel = default(CancellationToken));

        Task<string> PutAsync(
            Stream data,
            string contentType = Cid.DefaultContentType,
            string multiHash = MultiHash.DefaultAlgorithmName,
            bool pin = false,
            CancellationToken cancel = default(CancellationToken));

        Task<IDataBlock> StatAsync(Cid id, CancellationToken cancel = default(CancellationToken));

        Task<Cid> RemoveAsync(Cid id, bool ignoreNonexistent = false, CancellationToken cancel = default(CancellationToken));

    }
}
