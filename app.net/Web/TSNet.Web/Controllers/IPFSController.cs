using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ipfs;

using TSNet.Services;
using System.IO;
using Microsoft.AspNetCore.Http;
using TSNet.Web.Infrastructure.ViewModels;

namespace TSNet.Web.Controllers
{
    public class IPFSController : Controller
    {
        private IIpfsService ipfsService;
        private readonly IHttpContextAccessor _contextAccessor;
        public IPFSController(IIpfsService ipfsService, IHttpContextAccessor _contextAccessor)
        {
            this.ipfsService = ipfsService;
            this._contextAccessor = _contextAccessor;
    }

        [HttpPost]
        [Route("AddFile")]
        public async  Task<IActionResult> AddFile()
        {
            var httpRequest = this._contextAccessor.HttpContext.Request;
            var postedFile = httpRequest.Form.Files;
            List<IPFSResult> result = new List<IPFSResult>();
            foreach (var f in postedFile)
            {
                result.Add(new IPFSResult()
                {
                    Hash = await ipfsService.PutAsync(f.OpenReadStream()),
                    ContentType = f.ContentType
                });
            }
            //using (FileStream stream = System.IO.File.Open(@"testfiles\01.png", FileMode.Open))
            //{
               
            //}
            
            

            return Ok(result);
        }
    }
}