import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextData {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token")
    );

    const [user, setUser] = useState<User | null>(
        () => {
            const storedUser = localStorage.getItem("user");

            return storedUser
                ? JSON.parse(storedUser)
                : null;
        }
    );

    function login(token: string, user: User) {
        localStorage.setItem("token", token);
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);
        setUser(user);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro de um AuthProvider."
        );
    }

    return context;
}