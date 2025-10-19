import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    assignee: string;
}

const KanbanBoard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        fetch("http://localhost:3000/tasks")
            .then((res) => res.json())
            .then(setTasks);
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const taskId = parseInt(draggableId);
        const newStatus = destination.droppableId;

        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        }).then(() => loadTasks());
    };

    const getTasksByStatus = (status: string) =>
        tasks.filter((task) => task.status === status);

    const statusColumns = [
        { id: "todo", title: "To Do", color: "#ffeb3b" },
        { id: "in-progress", title: "In Progress", color: "#2196f3" },
        { id: "done", title: "Done", color: "#4caf50" },
    ];

    return (
        <div className="kanban-container">
            <h2>Kanban Доска</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban-grid">
                    {statusColumns.map((column) => (
                        <div key={column.id} className="kanban-column">
                            <h3
                                className="kanban-column-header"
                                style={{ background: column.color, color: column.id === 'todo' ? 'black' : 'white' }}
                            >
                                {column.title} ({getTasksByStatus(column.id).length})
                            </h3>

                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`kanban-dropzone ${snapshot.isDraggingOver ? 'kanban-dropzone-dragging' : ''}`}
                                    >
                                        {getTasksByStatus(column.id).map((task, index) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id.toString()}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`kanban-task ${snapshot.isDragging ? 'kanban-task-dragging' : ''}`}
                                                    >
                                                        <h4>{task.title}</h4>
                                                        <p>{task.description}</p>
                                                        <div className="kanban-task-meta">
                                                            <span>👤 {task.assignee}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;