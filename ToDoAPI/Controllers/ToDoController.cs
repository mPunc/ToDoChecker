using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> AddDefaultToDoTask()
        {
            var result = await _toDoService.AddDefaultToDoTaskService();

            return Ok(result);
        }

        [HttpPost("add-item")]
        [Consumes("application/xml")]
        public async Task<IActionResult> AddNewToDoListItem([FromBody] ToDoListItem? item)
        {
            var result = await _toDoService.AddNewToDoListItemService(item);

            return Ok(result);
        }

        [HttpPut("update-item/{id}")]
        public async Task<IActionResult> UpdateToDoListItem([FromRoute] int? id, [FromBody] ToDoListItem? item)
        {
            var result = await _toDoService.UpdateToDoListItemService(id, item);

            return Ok(result);
        }

        [HttpGet("get-item/{id}")]
        public async Task<ToDoListItem?> GetToDoListItemAtId([FromRoute] int? id)
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

        [HttpDelete("delete-item/{id}")]
        public async Task<IActionResult> DeleteToDoListItem([FromRoute] int? id)
        {
            var result = await _toDoService.DeleteToDoListItemService(id);

            return Ok(result);
        }
        
    }
}
