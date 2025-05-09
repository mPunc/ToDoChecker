using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;

namespace ToDoAPI.Repositories
{
    public class ToDoRepository
    {
        const string targetXmlPath = "./XmlData/to_do_list_items_data.xml";

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
        private static void ValidateWithDTD(string targetXmlPath)
        {
            var settings = new XmlReaderSettings
            {
                DtdProcessing = DtdProcessing.Parse,
                ValidationType = ValidationType.DTD,
                XmlResolver = new XmlUrlResolver()
            };

            settings.ValidationEventHandler += (sender, e) =>
            {
                Console.WriteLine($"DTD validation {e.Severity}: {e.Message}");
                if (e.Severity == XmlSeverityType.Error)
                {
                    throw new XmlException($"DTD validation error: {e.Message}");
                }
            };

            using var reader = XmlReader.Create(targetXmlPath, settings);
            while (reader.Read()) { }

            //Console.WriteLine("Validation finished.");
        }

        //initial create xml repo
        public async Task<string> GenerateXmlFilesRepository()
        {
            if (File.Exists(targetXmlPath))
            {
                ValidateWithDTD(targetXmlPath);
                return "File aready exists!";
            }
            await CommitXmlChanges(null);
            ValidateWithDTD(targetXmlPath);
            return "File successfully created at: '" + targetXmlPath + "'";
        }

        //CREATE one repo
        public async Task AddNewToDoListItemRepository(int id, ToDoListItem item)
        {
            ValidateWithDTD(targetXmlPath);
            List<ToDoListItem> list = await ReadXml();

            item.Id = id;
            list.Add(item);

            await CommitXmlChanges(list);
        }

        //READ one repo
        public async Task<ToDoListItem?> GetToDoListItemAtIdRepository(int id)
        {
            ValidateWithDTD(targetXmlPath);
            List<ToDoListItem> list = await ReadXml();
            return list.FirstOrDefault(x => { return x.Id == id; });
        }

        //UPDATE one repo
        public async Task UpdateToDoListItemRepository(ToDoListItem item)
        {
            ValidateWithDTD(targetXmlPath);

            var list =  await ReadXml();
            var targetToDoItem = list.FirstOrDefault(x => { return x.Id == item.Id; });
            if (targetToDoItem != null)
            {
                list.Remove(targetToDoItem);
                list.Add(item);
            }
            else throw new Exception("Item not found in file.");

            await CommitXmlChanges(list);
        }

        //DELETE one repo
        public async Task DeleteToDoListItemRepository(int id)
        {
            ValidateWithDTD(targetXmlPath);
            var list = await ReadXml();
            list.RemoveAll(x => x.Id == id);
            await CommitXmlChanges(list);
        }

        //READ ALL repo
        public async Task<List<ToDoListItem>> GetToDoListItemAllRepository()
        {
            ValidateWithDTD(targetXmlPath);
            List<ToDoListItem> list = await ReadXml();
            return list;
        }
        
    }
}
