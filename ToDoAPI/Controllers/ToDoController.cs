using Microsoft.AspNetCore.Mvc;
using System.Xml;
using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;
using ToDoAPI.Services;

namespace ToDoAPI.Controllers
{
    [Route("/todo")]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _toDoService = new();

        [HttpGet("generate-xml")]
        public async Task<IActionResult> GenerateXmlFiles()
        {
            var result = await _toDoService.GenerateXmlFilesService();

            return Ok(result);
        }
    }
}
