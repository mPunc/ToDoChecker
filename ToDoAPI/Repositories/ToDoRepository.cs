using System.Collections.Generic;
using System.Xml.Linq;
using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;

namespace ToDoAPI.Repositories
{
    public class ToDoRepository
    {
        public async Task GenerateXmlFilesRepository(string targetXmlPath)
        {
            var ToDoListItems = new ToDoListItemWrapper();
            var xmlSerializer = new XmlSerializer(typeof(ToDoListItemWrapper));
            using (var writer = new StreamWriter(targetXmlPath))
            {
                xmlSerializer.Serialize(writer, ToDoListItems);
            }
        }

        public async Task AddToDoTaskRepository(string targetXmlPath)
        {
            var newToDoItem = new ToDoListItem()
            {
                Id = 1,
                CreatedAt = DateTime.Now,
                Category = "music",
                Completed = false,
                Priority = "high",
                Title = "Play guitar",
                TextContent = new TextContent() { MainText = "asdasdasd", Notes = "asdfafa"},
                DueDate= DateTime.Now.AddDays(2)
            };

            List<ToDoListItem> list;
            var serializer = new XmlSerializer(typeof(List<ToDoListItem>), new XmlRootAttribute("ToDoListItems"));
            using (var reader = new StreamReader(targetXmlPath))
            {
                list = (List<ToDoListItem>)serializer.Deserialize(reader);
            }

            list.Add(newToDoItem);

            using (var writer = new StreamWriter(targetXmlPath))
            {
                serializer.Serialize(writer, list);
            }
        }
        public async Task<ToDoListItem?> GetFirstItemRepository(string targetXmlPath)
        {
            List<ToDoListItem> list;
            var serializer = new XmlSerializer(typeof(List<ToDoListItem>), new XmlRootAttribute("ToDoListItems"));
            using (var reader = new StreamReader(targetXmlPath))
            {
                list = (List<ToDoListItem>)serializer.Deserialize(reader);
            }
            var firstToDoItem = list.First();
            return firstToDoItem;
        }

        public async Task AddNewToDoListItemRepository(string targetXmlPath, ToDoListItem item)
        {
            List<ToDoListItem> list;
            var serializer = new XmlSerializer(typeof(List<ToDoListItem>), new XmlRootAttribute("ToDoListItems"));
            using (var reader = new StreamReader(targetXmlPath))
            {
                list = (List<ToDoListItem>)serializer.Deserialize(reader);
            }

            list.Add(item);

            using (var writer = new StreamWriter(targetXmlPath))
            {
                serializer.Serialize(writer, list);
            }
        }

        public async Task<ToDoListItem?> GetToDoListItemAtIdRepository(string targetXmlPath, int? id)
        {
            List<ToDoListItem> list;
            var serializer = new XmlSerializer(typeof(List<ToDoListItem>), new XmlRootAttribute("ToDoListItems"));
            using (var reader = new StreamReader(targetXmlPath))
            {
                list = (List<ToDoListItem>)serializer.Deserialize(reader);
            }
            var firstToDoItem = list.FirstOrDefault(x => { return x.Id == id; });

            return firstToDoItem;
        }

        
        public async Task<List<ToDoListItem>> GetToDoListItemAllRepository(string targetXmlPath)
        {
            List<ToDoListItem> list;
            var serializer = new XmlSerializer(typeof(List<ToDoListItem>), new XmlRootAttribute("ToDoListItems"));
            using (var reader = new StreamReader(targetXmlPath))
            {
                list = (List<ToDoListItem>)serializer.Deserialize(reader);
            }

            return list;
        }
    }
}
