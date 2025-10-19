import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface TaskFormProps {
    isEdit?: boolean;
}

const TaskForm = ({ isEdit = false }: TaskFormProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState("todo");

    useEffect(() => {
        if (isEdit && id) {
            fetch(`http://localhost:3000/tasks/${id}`)
                .then((res) => res.json())
                .then((task) => {
                    setTitle(task.title);
                    setDescription(task.description);
                    setAssignee(task.assignee);
                    setStatus(task.status);
                });
        }
    }, [isEdit, id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            assignee,
            status,
            created_at: isEdit ? undefined : new Date().toISOString(),
        };

        const url = isEdit
            ? `http://localhost:3000/tasks/${id}`
            : "http://localhost:3000/tasks";

        const method = isEdit ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });

        navigate("/");
    };

    return (
        <div className="task-form">
            <form onSubmit={handleSubmit} className="task-form-card">
                <h2>{isEdit ? "Редактировать задачу" : "Создать задачу"}</h2>

                <div className="form-group">
                    <label className="form-label">Заголовок:</label>
                    <input
                        type="text"
                        placeholder="Введите заголовок задачи"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Описание:</label>
                    <textarea
                        placeholder="Опишите задачу подробнее..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Исполнитель:</label>
                    <input
                        type="text"
                        placeholder="Введите имя исполнителя"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Статус:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-select"
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    {isEdit ? "Обновить задачу" : "Создать задачу"}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;