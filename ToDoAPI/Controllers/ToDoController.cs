using Microsoft.AspNetCore.Mvc;
using ToDoAPI.Models.ToDoListItems;
using ToDoAPI.Services;

namespace ToDoAPI.Controllers
{
    [Route("todo")]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _toDoService;

        public ToDoController(ToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        //initial create xml controller
        [HttpGet("generate-xml")]
        public async Task<IActionResult> GenerateXmlFiles()
        {
            var result = await _toDoService.GenerateXmlFilesService();

            return result is null ? BadRequest("Error creating xml :(") : Ok(result);
        }

        //CREATE one controller
        [HttpPost]
        [Consumes("application/xml")]
        public async Task<IActionResult> AddNewToDoListItem([FromBody] ToDoListItem? item)
        {
            var result = await _toDoService.AddNewToDoListItemService(item);

            return result is null ? NotFound("Error with item. Check if xml file exists!") : Ok(result);
        }

        //READ one controller
        [HttpGet("{id}")]
        [Produces("application/xml")]
        public async Task<IActionResult> GetToDoListItemAtId([FromRoute] int? id)
        {
            var result = await _toDoService.GetToDoListItemAtIdService(id);

            return result is null ? NotFound("Error: Item not found.") : Ok(result);
        }

        //UPDATE one controller
        [HttpPut]
        [Consumes("application/xml")]
        public async Task<IActionResult> UpdateToDoListItem([FromBody] ToDoListItem? item)
        {
            var result = await _toDoService.UpdateToDoListItemService(item);

            return result is null ? NotFound("Error: Item not found.") : Ok(result);
        }

        //DELETE one controller
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoListItem([FromRoute] int? id)
        {
            var result = await _toDoService.DeleteToDoListItemService(id);

            return result is null ? NotFound("Error: Item not found.") : Ok(result);
        }

        //READ ALL controller
        [HttpGet("get-all")]
        [Produces("application/xml")]
        public async Task<IActionResult> GetToDoListItemAll()
        {
            var result = await _toDoService.GetToDoListItemAllService();

            return result is null ? NotFound("There was an error, you might need to generate xml.") : Ok(result);
        }
        
    }
}
