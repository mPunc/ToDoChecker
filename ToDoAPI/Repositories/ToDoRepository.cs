using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;

namespace ToDoAPI.Repositories
{
    public class ToDoRepository
    {
        public async Task GenerateXmlFilesRepository(string targetXmlPath)
        {
            TextContent tc = new TextContent();
            tc.MainText = "asd";
            tc.Notes = "shit";
            var sampleToDoItems = new ToDoListItemWrapper();
            sampleToDoItems.Items.AddRange(
                new ToDoListItem
                {
                    Id = 1,
                    Title = "Buy Groceries",
                    TextContent = new TextContent
                    {
                        MainText = "shit",
                        Notes = "crap"
                    },
                    CreatedAt = DateTime.Now,
                    DueDate = DateTime.Now.AddDays(2),
                    Priority = "High",
                    Category = "sport",
                    Completed = true
                },
                new ToDoListItem
                {
                    Id = 1,
                    Title = "Buy Groceries",
                    TextContent = tc,
                    CreatedAt = DateTime.Now,
                    DueDate = DateTime.Now.AddDays(2),
                    Priority = "High",
                    Category = "sport",
                    Completed = true
                }
            );

            // Create the XML serializer
            var xmlSerializer = new XmlSerializer(typeof(ToDoListItemWrapper));

            // Write the data to the XML file
            using (var writer = new StreamWriter(targetXmlPath))
            {
                xmlSerializer.Serialize(writer, sampleToDoItems); // Serialize the list to the XML file
            }
        }
    }
}
