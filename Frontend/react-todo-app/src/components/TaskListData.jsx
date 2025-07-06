import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseXmlToTasks, updateTaskXml } from '../utils/xmlParser';
import TaskCard from './TaskCard';

export default function TasksListData() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Fetch tasks on page load */
  useEffect(() => {
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/todo/get-all', {
        headers: { Accept: 'application/xml' },
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const xmlString = await res.text();
      const tasks = await parseXmlToTasks(xmlString);
      /* Sort by due date, default for now */
      tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setTasks(tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchTasks();
}, []);


  /* Navigation to Details page for each task */
  const navigate = useNavigate();
  const onDetails = (id) => {
    navigate(`/todo/${id}`);
  }

  /* Delete function */
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;
    try {
      const res = await fetch(`http://localhost:5001/todo/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`Failed to delete task with id ${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  /* Loading and Error text */
  if (loading) return <p className='mt-6 text-center text-gray-800 text-xl'>Fetching your to-do list...</p>;
  if (error) return <p className='mt-6 text-center text-gray-800 text-xl'>Error: {error}</p>;

  /* Complete task function */
  const handleComplete = async (task) => {
    const newCompleted = task.completed === 'true' ? 'false' : 'true';    
    const updatedTask = { ...task, completed: newCompleted };
    const xml = await updateTaskXml(updatedTask);
    try {
      const res = await fetch(`http://localhost:5001/todo/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: xml,
      });
      if (!res.ok) throw new Error('Failed to mark task as complete');
      setTasks(prev =>
        prev.map(t => (t.id === updatedTask.id ? { ...t, completed: newCompleted } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid gap-6 p-4 md:grid-cols-2 md:mx-4 lg:grid-cols-3 lg:mx-8">
      {tasks.map(task => (
        <TaskCard key={task.id}
          task={task}
          onDelete={handleDelete}
          onComplete={handleComplete}
          onDetails={onDetails}/>
        ))
      }
    </div>
  );
}
