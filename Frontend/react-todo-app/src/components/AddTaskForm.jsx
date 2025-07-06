import { useState } from 'react';
import { buildTaskXml } from '../utils/xmlParser'

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('low');
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const xmlData = await buildTaskXml(title, mainText, notes, category, priority, completed, dueDate);

    try {
      const res = await fetch('http://localhost:5001/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          'Accept': 'application/xml',
        },
        body: xmlData,
      });
      if (!res.ok) throw new Error(`Failed to add task: ${res.status}`);
      setSuccess('Task added successfully!');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-6 px-4 space-y-4 text-gray-800">
      <h2 className="text-xl font-bold">Add New Task</h2>

      <input
        type="text"
        placeholder="Title*"
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        placeholder="Main Text*"
        required
        value={mainText}
        onChange={e => setMainText(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="flex items-center gap-2">
        <label htmlFor="dueDate" className="text-lg">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          required
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
          className="form-checkbox"
        />
        <span>Completed</span>
      </label>

      {error && <p className="text-red-600 text-center text-xl">{error}</p>}
      {success && <p className="text-green-600 text-center text-xl">{success}</p>}

      <button
        type="submit"
        className="block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Add Task
      </button>
    </form>
  );
}
