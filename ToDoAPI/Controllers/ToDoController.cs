using Microsoft.AspNetCore.Mvc;
using System.Xml;
using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;
using ToDoAPI.Services;

namespace ToDoAPI.Controllers
{
    [Route("todo")]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _toDoService = new();

        [HttpGet("generate-xml")]
        public async Task<IActionResult> GenerateXmlFiles()
        {
            var result = await _toDoService.GenerateXmlFilesService();

            return Ok(result);
        }

        [HttpGet("test/add-item")]
        public async Task<IActionResult> AddToDoTask()
        {
            var result = await _toDoService.AddToDoTaskService();

            return Ok(result);
        }

        [HttpGet("test/get-first")]
        public async Task<ToDoListItem?> GetFirstItem()
        {
            var result = await _toDoService.GetFirstItemService();

            return result;
        }

        [HttpPost("add-item")]
        [Consumes("application/xml")]
        public async Task<IActionResult> AddNewToDoListItem([FromBody] ToDoListItem? item)
        {
            var result = await _toDoService.AddNewToDoListItemService(item);

            return Ok(result);
        }

        [HttpGet("get-item")]
        public async Task<ToDoListItem?> GetToDoListItemAtId(int? id)
        {
            var result = await _toDoService.GetToDoListItemAtIdService(id);

            return result;
        }

        [HttpGet("get-all")]
        public async Task<List<ToDoListItem>> GetToDoListItemAll()
        {
            var result = await _toDoService.GetToDoListItemAllService();

            return result;
        }
    }
}
