export default function TaskCard({ task, onDelete, onComplete, onDetails }) {
  return (
    <div className="border rounded-xl p-4 pt-3 pb-3 shadow hover:shadow-xl transition duration-500 ease-in-out text-gray-800 bg-indigo-100 h-fit self-center">
      <div className='flex justify-between mb-2'>
        <h3 className="font-bold text-xl break-all">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="text-red-600 hover:text-red-800 font-bold text-xl cursor-pointer self-start"
        >
          &times;
        </button>
      </div>

      <div className="text-sm flex justify-between">
        <p><strong>Category:</strong> {task.category}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
      </div>

      <p className="text-md text-gray-700 mt-2 mb-2 break-all">{task.mainText}</p>
      
      <p className="text-sm"><strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}</p>
      
      {task.notes && <p className="italic text-sm text-gray-500 mb-2 break-all">Notes: {task.notes}</p>}

      <p className="italic text-sm text-gray-500">Created: {new Date(task.createdAt).toLocaleString()}</p>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onComplete(task)}
          className={`px-3 py-1 rounded text-white ${
            task.completed === 'true'
              ? 'bg-green-500 hover:bg-red-500 cursor-pointer'
              : 'bg-indigo-500 hover:bg-green-600 cursor-pointer'
          }`}
        >
          {task.completed === 'true' ? 'Task done' : 'Mark as done'}
        </button>
        <button
          onClick={() => onDetails(task.id)}
          className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
        >
          Details
        </button>
      </div>
    </div>
  );
}
