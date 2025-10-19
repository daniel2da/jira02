import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    assignee: string;
}

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        fetch("http://localhost:3000/tasks")
            .then((res) => res.json())
            .then(setTasks);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
            fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" })
                .then(() => loadTasks());
        }
    };

    const handleStatusChange = (taskId: number, newStatus: string) => {
        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        }).then(() => loadTasks());
    };

    const filteredTasks = tasks.filter(
        (task) => statusFilter === "all" || task.status === statusFilter
    );

    return (
        <div className="page-container">
            <div style={{ marginBottom: "1rem" }}>
                <label style={{ marginRight: "0.5rem" }}>Фильтр по статусу:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select"
                >
                    <option value="all">Все</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="grid">
                {filteredTasks.map((task) => (
                    <div key={task.id} className="task-card">
                        <div className="task-card-content">
                            <div className="task-card-main">
                                <h3>{task.title}</h3>
                                <p className="text-muted">{task.description}</p>

                                <div className="task-card-meta">
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                        className="status-selector"
                                    >
                                        <option value="todo">To Do</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                    <span className="text-muted">👤 {task.assignee}</span>
                                </div>
                            </div>

                            <div className="task-card-actions">
                                <Link
                                    to={`/edit/${task.id}`}
                                    className="btn btn-warning btn-small"
                                >
                                    Редактировать
                                </Link>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="btn btn-error btn-small"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredTasks.length === 0 && (
                    <p className="text-center text-muted">Нет задач для отображения.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;