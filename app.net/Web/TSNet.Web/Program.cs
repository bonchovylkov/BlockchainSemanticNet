namespace TSNet.Web
{
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using System.IO;

    public static class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
            //var host = new WebHostBuilder()
            //           .UseKestrel()
            //           .UseContentRoot(Directory.GetCurrentDirectory())
            //           .UseIISIntegration()
            //           .UseStartup<Startup>()
            //           .Build();
        }

        private static IWebHost BuildWebHost(string[] args) =>
            WebHost
              .CreateDefaultBuilder(args)
              //.UseKestrel()
              //.UseContentRoot(Directory.GetCurrentDirectory())
              //.UseIISIntegration()
              .UseStartup<Startup>()
              .Build();
    }
}
