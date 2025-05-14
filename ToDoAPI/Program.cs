
using ToDoAPI.Repositories;
using ToDoAPI.Services;

namespace ToDoAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // builder.WebHost.UseUrls("http://*:5000"); // handled in Dockerfile

            // Add services to the container.
            builder.Services.AddControllers();

            // Sends xml instead of json
            builder.Services.AddControllers().AddXmlSerializerFormatters();

            builder.Services.AddTransient<ToDoService>();
            builder.Services.AddScoped<ToDoRepository>();

            builder.Services.AddSwaggerGen();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ToDoAPI V1");
                    c.RoutePrefix = string.Empty; // Makes Swagger UI accessible at the root
                });
            }

            //Configure middleware
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
