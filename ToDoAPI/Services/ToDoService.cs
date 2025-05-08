using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;
using ToDoAPI.Repositories;

namespace ToDoAPI.Services
{
    public class ToDoService
    {
        private readonly ToDoRepository _toDoRepository = new();
        const string targetXmlPath = "./XmlData/to_do_list_itmes_data.xml";

        public async Task<string> GenerateXmlFilesService()
        {

            if (System.IO.File.Exists(targetXmlPath))
            {
                return $"File exists at {targetXmlPath}";
            }
            else
            {
                await _toDoRepository.GenerateXmlFilesRepository(targetXmlPath);
                return $"File successfully created at {targetXmlPath}";
            }
        }

        public async Task<string> AddToDoTaskService()
        {
            try
            {
                await _toDoRepository.AddToDoTaskRepository(targetXmlPath);
                return "Added!";
            }
            catch (Exception ex) 
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return "Failed :(";
            }
        }

        public async Task<ToDoListItem?> GetFirstItemService()
        {
            try
            {
                var item = await _toDoRepository.GetFirstItemRepository(targetXmlPath);
                return item;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return null;
            }
        }

    }
}
