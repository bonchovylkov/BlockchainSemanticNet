namespace TSNet.Web
{
    using System;
    using System.Linq;
    using System.Net;
    using System.Reflection;
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Text;
    using System.Threading.Tasks;

    using TSNet.Common;
    using TSNet.Common.Mapping;
    using TSNet.Data;
    using TSNet.Data.Common.Repositories;
    using TSNet.Data.Models;
    using TSNet.Data.Repositories;
    using TSNet.Data.Seeding;
    using TSNet.Services.Messaging;
    using TSNet.Web.Infrastructure.Middlewares.Auth;
    using TSNet.Web.ViewModels.TodoItems;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    using Newtonsoft.Json;
    using TSNet.Services;
    using Microsoft.Extensions.DependencyInjection.Extensions;

    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            

            services.AddMvc();

            services.AddSingleton(this.configuration);

            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

            // Application services
            services.AddTransient<IEmailSender, NullMessageSender>();
            services.AddTransient<ISmsSender, NullMessageSender>();
            services.AddTransient<IIpfsService, IpfsService>();

            services.Configure<IISOptions>(options =>
            {
                options.ForwardClientCertificate = false;
            });

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            AutoMapperConfig.RegisterMappings(typeof(TodoItemViewModel).GetTypeInfo().Assembly);



            //if (env.IsDevelopment())
            //{
                app.UseExceptionHandler(application =>
                {
                    application.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = GlobalConstants.JsonContentType;

                        var ex = context.Features.Get<IExceptionHandlerFeature>();
                        if (ex != null)
                        {
                            await context.Response
                                .WriteAsync(JsonConvert.SerializeObject(new { ex.Error?.Message, ex.Error?.StackTrace }))
                                .ConfigureAwait(continueOnCapturedContext: false);
                        }
                    });
                });
           // }

            app.UseFileServer();



            app.UseMvc(routes => routes.MapRoute("default", "api/{controller}/{action}/{id?}"));
        }

      
    }
}
