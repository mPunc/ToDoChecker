using System.Xml.Serialization;

namespace ToDoAPI.Models.ToDoListItems
{
    [XmlRoot("TextContent")]
    public class TextContent
    {
        [XmlElement("MainText")]
        public string? MainText { get; set; }

        [XmlElement("Notes")]
        public string? Notes { get; set; }
    }
}
