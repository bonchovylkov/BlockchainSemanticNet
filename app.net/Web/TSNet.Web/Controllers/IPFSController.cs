using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ipfs;
using Ipfs.Api;

namespace TSNet.Web.Controllers
{
    public class IPFSController : Controller
    {
        public IActionResult AddFile()
        {
            var ipfs = new IpfsClient();
            //ipfs.UploadAsync()

            return Ok();
        }
    }
}