using System.Collections.Generic;
using System.Text;
using System.Xml;
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

        private static void CommitXmlChanges(List<ToDoListItem>? list)
        {
            var ToDoListItems = new ToDoListItemWrapper();
            if (list != null && list.Count != 0)
                ToDoListItems.Items.AddRange(list);
            var xmlSerializer = new XmlSerializer(typeof(ToDoListItemWrapper));
            var xmlSettings = new XmlWriterSettings
            {
                Indent = true,
                Encoding = Encoding.UTF8
            };
            using (var stream = new FileStream(targetXmlPath, FileMode.Create))
            using (var writer = XmlWriter.Create(stream, xmlSettings))
            {
                writer.WriteDocType("ToDoListItems", null, "to_do_list_items_dtd.dtd", null);
                xmlSerializer.Serialize(writer, ToDoListItems);
            }
        }

        public async Task<string> GenerateXmlFilesRepository()
        {
            if (File.Exists(targetXmlPath))
            {
                return "File exists!";
            }
            CommitXmlChanges(null);
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

        public async Task AddNewToDoListItemRepository(int id, ToDoListItem item)
        {
            List<ToDoListItem> list = ReadXml();

            item.Id = id;
            list.Add(item);

            CommitXmlChanges(list);
        }

        public async Task UpdateToDoListItemRepository(ToDoListItem? item)
        {
            var list = ReadXml();

            list.RemoveAll(x => x.Id == item.Id);
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
