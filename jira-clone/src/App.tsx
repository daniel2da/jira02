import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import NewTaskPage from "./pages/NewTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import LoginPage from "./pages/LoginPage";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle.tsx";
import ProtectedRoute from "./components/Protected/ProtectedRoute.tsx";

const AppContent = () => {
    const { isDark } = useTheme();
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <div className={isDark ? "dark-theme" : "light-theme"}>
            <nav className="nav">
                {isAuthenticated ? (
                    <>
                        <Link to="/" className="nav-link">Главная</Link>
                        <Link to="/new" className="nav-link">Создать задачу</Link>

                        <div className="nav-user">
                            <span className="user-info">👤 {user?.username}</span>
                            <ThemeToggle />
                            <button onClick={logout} className="btn btn-secondary">
                                Выйти
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="nav-guest">
                        <ThemeToggle />
                    </div>
                )}
            </nav>

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path="/new" element={
                    <ProtectedRoute>
                        <NewTaskPage />
                    </ProtectedRoute>
                } />
                <Route path="/edit/:id" element={
                    <ProtectedRoute>
                        <EditTaskPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    );
};

const App = () => (
    <ThemeProvider>
        <AuthProvider>
            <BrowserRouter>
                <AppContent/>
            </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
);

export default App;