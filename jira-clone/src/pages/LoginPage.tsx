import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (login(username, password)) {
            navigate('/');
        } else {
            setError('Неверное имя пользователя или пароль');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Вход в Jira Clone</h2>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">Имя пользователя:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                        placeholder="Введите имя пользователя"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        placeholder="Введите пароль"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary login-btn">
                    Войти
                </button>

                <div className="test-users">
                    <p>Тестовые пользователи:</p>
                    <ul>
                        <li>admin / admin123</li>
                        <li>user / user123</li>
                        <li>daniel / daniel123</li>
                    </ul>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;