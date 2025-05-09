using System.Xml.Serialization;

namespace ToDoAPI.Models.ToDoListItems
{
    [XmlRoot("ToDoListItems")]
    public class ToDoListItemWrapper
    {
        [XmlElement("ToDoListItem")]
        public List<ToDoListItem> Items { get; set; } = new List<ToDoListItem>();
    }
}
