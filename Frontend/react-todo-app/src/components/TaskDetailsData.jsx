import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5001/todo/${id}`);

        if (!res.ok) throw new Error('Failed to fetch task');

        const xmlText = await res.text();

        // Simple XML parsing example with DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        // Extract fields from XML - adjust based on your structure
        const item = xmlDoc.querySelector('ToDoListItem');
        if (!item) throw new Error('Task not found in XML');

        const parseText = (tag) => item.querySelector(tag)?.textContent || '';
        const completedAttr = item.getAttribute('completed');

        const taskObj = {
          id,
          completed: completedAttr,
          category: item.getAttribute('category'),
          title: parseText('Title'),
          mainText: parseText('MainText'),
          notes: parseText('Notes'),
          createdAt: parseText('CreatedAt'),
          dueDate: parseText('DueDate'),
          priority: parseText('Priority'),
        };

        setTask(taskObj);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [id]);

  if (loading) return <p>Loading task details...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!task) return <p>No task data available.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p><strong>Category:</strong> {task.category}</p>
      <p><strong>Completed:</strong> {task.completed}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
      <p><strong>Main Text:</strong> {task.mainText}</p>
      {task.notes && <p><strong>Notes:</strong> {task.notes}</p>}
    </div>
  );
}

export default TaskDetails;
