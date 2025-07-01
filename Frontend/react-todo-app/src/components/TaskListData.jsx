import { useEffect, useState } from 'react';

function parseXmlToTasks(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
  
  const items = [...xmlDoc.getElementsByTagName('ToDoListItem')];
  
  return items.map(item => {
    const getText = (tag) => {
      const el = item.getElementsByTagName(tag)[0];
      return el ? el.textContent : '';
    };

    return {
      id: getText('Id'),
      title: getText('Title'),
      mainText: getText('MainText'),
      notes: getText('Notes'),
      createdAt: getText('CreatedAt'),
      dueDate: getText('DueDate'),
      priority: getText('Priority'),
      completed: item.getAttribute('completed'),
      category: item.getAttribute('category'),
    };
  });
}

export default function TasksListData() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = () => {
    setLoading(true);
    fetch('http://localhost:5001/todo/get-all', { headers: { Accept: 'application/xml' } })
      .then(res => res.text())
      .then(xmlString => {
        const tasks = parseXmlToTasks(xmlString);
        setTasks(tasks);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/todo/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete task with id ${id}`);
      }

      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleComplete = async (task) => {
  const updatedTask = { ...task, completed: 'true' };

  // Build XML string to match your API
  const xml = `
    <ToDoListItem completed="true" category="${updatedTask.category}">
      <Id>${updatedTask.id}</Id>
      <Title>${updatedTask.title}</Title>
      <TextContent>
        <MainText>${updatedTask.mainText}</MainText>
        <Notes>${updatedTask.notes}</Notes>
      </TextContent>
      <CreatedAt>${updatedTask.createdAt}</CreatedAt>
      <DueDate>${updatedTask.dueDate}</DueDate>
      <Priority>${updatedTask.priority}</Priority>
    </ToDoListItem>
  `;

    try {
      const res = await fetch(`http://localhost:5001/todo/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: xml,
      });

      if (!res.ok) throw new Error('Failed to mark task as complete');

      // Update UI
      setTasks(prev =>
        prev.map(t => (t.id === updatedTask.id ? { ...t, completed: 'true' } : t))
      );
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={() => handleDelete(task.id)} onComplete={handleComplete}/>
      ))}
    </div>
  );
}

function TaskCard({ task, onDelete, onComplete }) {
  const handleComplete = () => {
    // Only trigger if not already completed
    if (task.completed === 'true') return;
    onComplete(task);
  };

  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition">
      <div className="flex justify-end">
        <button
          onClick={onDelete}
          aria-label="Delete task"
          className="text-red-600 hover:text-red-800 font-bold text-xl"
        >
          &times;
        </button>
      </div>

      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{task.mainText}</p>
      {task.notes && <p className="italic text-gray-500 mb-2">Notes: {task.notes}</p>}
      <p><strong>Category:</strong> {task.category}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Completed:</strong> {task.completed}</p>
      <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}</p>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleComplete}
          disabled={task.completed === 'true'}
          className={`px-3 py-1 rounded text-white ${
            task.completed === 'true'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {task.completed === 'true' ? 'Completed' : 'Mark as Complete'}
        </button>
        <button
          onClick={() => onDetails(task.id)}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Details
        </button>
      </div>
    </div>
  );
}

