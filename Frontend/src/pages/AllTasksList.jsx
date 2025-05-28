import { useEffect, useState } from 'react';
import { fetchGetAll } from "../api/todoApi";
import TaskCard from '../components/task_components/TaskCard';

function AllTasksList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const root = await fetchGetAll();
            if (!root) return;

            const items = [...root.children];

            const parsedTasks = items.map(item => {
                const id = item.querySelector('Id')?.textContent ?? '';
                const title = item.querySelector('Title')?.textContent ?? '';
                const mainText = item.querySelector('MainText')?.textContent ?? '';
                const notes = item.querySelector('Notes')?.textContent ?? '';
                const createdAt = item.querySelector('CreatedAt')?.textContent ?? '';
                const dueDate = item.querySelector('DueDate')?.textContent ?? '';
                const priority = item.querySelector('Priority')?.textContent ?? '';
                const completed = item.getAttribute('completed') ?? 'false';
                const category = item.getAttribute('category') ?? '';

                return { id, title, mainText, notes, createdAt, dueDate, priority, completed, category };
            });

            setTasks(parsedTasks);
        }

        loadTasks();
    }, []);

    return (
        <div className="all-tasks-container">
            <h2>Your tasks:</h2>
            <div>
                {tasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </div>
        </div>
    );
}

export default AllTasksList;
