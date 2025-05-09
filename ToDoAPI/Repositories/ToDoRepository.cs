using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;

namespace ToDoAPI.Repositories
{
    public class ToDoRepository
    {
        const string targetXmlPath = "./XmlData/to_do_list_itmes_data.xml";

        private static async Task<List<ToDoListItem>> ReadXml()
        {
            var serializer = new XmlSerializer(typeof(ToDoListItemWrapper), new XmlRootAttribute("ToDoListItems"));

            await using var stream = new FileStream(targetXmlPath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);
            using var reader = new StreamReader(stream);

            var list = (ToDoListItemWrapper)serializer.Deserialize(reader)!;
            return list.Items;
        }
        private static async Task CommitXmlChanges(List<ToDoListItem>? list)
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

            await using var stream = new FileStream(targetXmlPath, FileMode.Create, FileAccess.Write, FileShare.None, 4096, useAsync: true);
            using var writer = XmlWriter.Create(stream, xmlSettings);

            writer.WriteDocType("ToDoListItems", null, "to_do_list_items_dtd.dtd", null);
            var ns = new XmlSerializerNamespaces();
            ns.Add("", ""); // remove default namespaces
            xmlSerializer.Serialize(writer, ToDoListItems, ns);

            await stream.FlushAsync();
        }

        public async Task<string> GenerateXmlFilesRepository()
        {
            if (File.Exists(targetXmlPath))
            {
                return "File aready exists!";
            }
            await CommitXmlChanges(null);
            return "File successfully created at: '" + targetXmlPath + "'";
        }

        public async Task AddNewToDoListItemRepository(int id, ToDoListItem item)
        {
            List<ToDoListItem> list = await ReadXml();

            item.Id = id;
            list.Add(item);

            await CommitXmlChanges(list);
        }

        public async Task UpdateToDoListItemRepository(ToDoListItem? item)
        {
            var list =  await ReadXml();

            list.RemoveAll(x => x.Id == item.Id);
            list.Add(item);

            await CommitXmlChanges(list);
        }

        public async Task<ToDoListItem?> GetToDoListItemAtIdRepository(int? id)
        {
            List<ToDoListItem> list = await ReadXml();
            var targetToDoItem = list.FirstOrDefault(x => { return x.Id == id; });

            return targetToDoItem;
        }

        
        public async Task<List<ToDoListItem>> GetToDoListItemAllRepository()
        {
            List<ToDoListItem> list = await ReadXml();
            return list;
        }

        public async Task DeleteToDoListItemRepository(int? id)
        {
            var list = await ReadXml();

            list.RemoveAll(x => x.Id == id);

            await CommitXmlChanges(list);
        }
    }
}
