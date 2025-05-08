namespace ToDoAPI.Models
{
    public class ToDoListItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TextContent { get; set; }
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public string Priority { get; set; }
    }
}
