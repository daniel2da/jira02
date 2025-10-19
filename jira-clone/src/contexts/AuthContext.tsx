import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fakeUsers = [
    { id: '1', username: 'admin', password: 'admin123', email: 'admin@gmail.com' },
    { id: '2', username: 'user', password: 'user123', email: 'user@gmail.com' },
    { id: '3', username: 'daniel', password: 'daniel123', email: 'daniel@gmail.com' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        const foundUser = fakeUsers.find(
            u => u.username === username && u.password === password
        );

        if (foundUser) {
            const userInfo: User = {
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email,
            };
            setUser(userInfo);
            localStorage.setItem('user', JSON.stringify(userInfo));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};