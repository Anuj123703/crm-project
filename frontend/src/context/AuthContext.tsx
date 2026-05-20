import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
    _id: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: { token: string; user: User }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const login = (data: { token: string; user: User }) => {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext must be used inside provider");
    }

    return context;
};