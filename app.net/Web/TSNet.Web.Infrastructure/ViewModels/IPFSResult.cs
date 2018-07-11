using System;
using System.Collections.Generic;
using System.Text;

namespace TSNet.Web.Infrastructure.ViewModels
{
    public class IPFSResult
    {
        public string Hash { get; set; }
        public string ContentType { get; set; }
        public string Link
        {
            get
            {
                return "https://ipfs.io/ipfs/" + this.Hash;
            }
        }
    }
}
