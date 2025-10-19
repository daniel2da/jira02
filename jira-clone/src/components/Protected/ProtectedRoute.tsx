import { Navigate } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;