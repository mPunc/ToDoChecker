export default function TaskCard({ id, title, mainText, notes, completed, category, createdAt, dueDate, priority }) {
    createdAt = new Date(createdAt).toLocaleString();
    dueDate = new Date(createdAt).toLocaleString();
    return (
        <div className="task-card">
        <h3>{title}</h3>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Main Text:</strong> {mainText}</p>
        <p><strong>Notes:</strong> {notes}</p>
        <p><strong>Status:</strong> {completed === 'true' ? '✅ Completed' : '❌ Not completed'}</p>
        <p><strong>Priority:</strong> {priority}</p>
        <p><strong>Created At:</strong> {createdAt}</p>
        <p><strong>Due Date:</strong> {dueDate}</p>
        </div>
    );
}
