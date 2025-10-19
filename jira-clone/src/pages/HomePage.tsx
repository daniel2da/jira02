import { useState } from "react";
import TaskList from "../components/Task/TaskList.tsx";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard.tsx";

const HomePage = () => {
    const [view, setView] = useState<'list' | 'kanban'>('list');

    return (
        <div>
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                padding: '0 1rem'
            }}>
                <button
                    onClick={() => setView('list')}
                    style={{
                        padding: '0.5rem 1rem',
                        background: view === 'list' ? '#0070f3' : '#f5f5f5',
                        color: view === 'list' ? 'white' : 'black',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    📋 Список
                </button>
                <button
                    onClick={() => setView('kanban')}
                    style={{
                        padding: '0.5rem 1rem',
                        background: view === 'kanban' ? '#0070f3' : '#f5f5f5',
                        color: view === 'kanban' ? 'white' : 'black',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    🗂️ Kanban Доска
                </button>
            </div>

            {view === 'list' ? <TaskList /> : <KanbanBoard />}
        </div>
    );
};

export default HomePage;