using Microsoft.AspNetCore.Mvc;
using System.Xml;
using System.Xml.Serialization;
using ToDoAPI.Models.ToDoListItems;

namespace ToDoAPI.Controllers
{
    [Route("/todo")]
    public class ToDoController : ControllerBase
    {
        private static List<ToDoListItem> toDoListItems = new List<ToDoListItem>();

        [HttpGet]
        [Route("test")]
        public ToDoListItem TestCall()
        {
            ToDoListItem toDoListItem = new ToDoListItem();
            toDoListItem.Title = "Test";

            return toDoListItem;
        }

        [HttpGet("generate-xml")]
        public IActionResult GenerateXmlFile()
        {
            const string targetXmlPath = "./XmlData/to_do_list_itmes_data.xml";

            if (System.IO.File.Exists(targetXmlPath))
            {
                return Ok($"File exists at {targetXmlPath}");
            }
            else
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

                return Ok($"File created at {targetXmlPath}");

            }


            return Ok();
        }
    }
}
