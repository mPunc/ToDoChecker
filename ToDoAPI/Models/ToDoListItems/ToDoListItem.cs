using System.Xml.Serialization;

namespace ToDoAPI.Models.ToDoListItems
{
    [XmlRoot("ToDoListItem")]
    public class ToDoListItem
    {
        [XmlElement("Id")]
        public int Id { get; set; }

        [XmlElement("Title")]
        public required string Title { get; set; }

        [XmlElement("TextContent")]
        public required TextContent TextContent { get; set; }

        [XmlElement("CreatedAt")]
        public DateTime CreatedAt { get; set; }

        [XmlElement("DueDate")]
        public DateTime? DueDate { get; set; }

        [XmlElement("Priority")]
        public string? Priority { get; set; }

        [XmlAttribute("completed")]
        public bool Completed { get; set; }

        [XmlAttribute("category")]
        public string? Category { get; set; }
    }
 
}
