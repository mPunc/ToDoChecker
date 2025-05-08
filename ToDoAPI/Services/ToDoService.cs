using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;
using ToDoAPI.Repositories;

namespace ToDoAPI.Services
{
    public class ToDoService
    {
        private readonly ToDoRepository _toDoRepository = new();

        public async Task<string> GenerateXmlFilesService()
        {
            const string targetXmlPath = "./XmlData/to_do_list_itmes_data.xml";

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

    }
}
