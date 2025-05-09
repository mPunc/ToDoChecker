using System.Collections.Generic;
using System.Xml.Linq;
using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;

namespace ToDoAPI.Repositories
{
    public class ToDoRepository
    {
        const string targetXmlPath = "./XmlData/to_do_list_itmes_data.xml";

        private static List<ToDoListItem> ReadXml()
        {
            List<ToDoListItem> list;
            var serializer = new XmlSerializer(typeof(List<ToDoListItem>), new XmlRootAttribute("ToDoListItems"));
            using (var reader = new StreamReader(targetXmlPath))
            {
                list = (List<ToDoListItem>)serializer.Deserialize(reader);
            }
            return list;
        }

        private static void CommitXmlChanges(List<ToDoListItem> list)
        {
            var serializer = new XmlSerializer(typeof(List<ToDoListItem>), new XmlRootAttribute("ToDoListItems"));
            using (var writer = new StreamWriter(targetXmlPath))
            {
                serializer.Serialize(writer, list);
            }
        }

        public async Task<string> GenerateXmlFilesRepository()
        {
            if (File.Exists(targetXmlPath))
            {
                return "File exists!";
            }
            var ToDoListItems = new ToDoListItemWrapper();
            var xmlSerializer = new XmlSerializer(typeof(ToDoListItemWrapper));
            using (var writer = new StreamWriter(targetXmlPath))
            {
                xmlSerializer.Serialize(writer, ToDoListItems);
            }
            return "File successfully created!";
        }

        public async Task AddDefaultToDoTaskRepository(int id)
        {
            var list = ReadXml();

            var newToDoItem = new ToDoListItem()
            {
                Id = id,
                CreatedAt = DateTime.Now,
                Category = "music",
                Completed = false,
                Priority = "high",
                Title = "Play guitar",
                TextContent = new TextContent() { MainText = "asdasdasd", Notes = "asdfafa"},
                DueDate= DateTime.Now.AddDays(2)
            };

            list.Add(newToDoItem);

            CommitXmlChanges(list);
            
        }

        public async Task AddNewToDoListItemRepository(ToDoListItem item)
        {
            List<ToDoListItem> list = ReadXml();

            list.Add(item);

            CommitXmlChanges(list);
        }

        public async Task UpdateToDoListItemRepository(int? id, ToDoListItem? item)
        {
            List<ToDoListItem> list = ReadXml();

            list.RemoveAll(x => x.Id == id);
            list.Add(item);

            CommitXmlChanges(list);
        }

        public async Task<ToDoListItem?> GetToDoListItemAtIdRepository(int? id)
        {
            List<ToDoListItem> list = ReadXml();
            var targetToDoItem = list.FirstOrDefault(x => { return x.Id == id; });

            return targetToDoItem;
        }

        
        public async Task<List<ToDoListItem>> GetToDoListItemAllRepository()
        {
            List<ToDoListItem> list = ReadXml();
            return list;
        }

        public async Task DeleteToDoListItemRepository(int? id)
        {
            var list = ReadXml();

            list.RemoveAll(x => x.Id == id);

            CommitXmlChanges(list);
        }
    }
}
