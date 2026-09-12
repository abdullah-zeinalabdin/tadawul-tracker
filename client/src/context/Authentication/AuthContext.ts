import { createContext } from "react";
import type { LoginProps, RegisterProps } from "./AuthProvider";

interface AuthContextType {
    userData: { email: string } | null,
    login: ({ email, password }: LoginProps) => Promise<void>,
    logout: () => void,
    register: ({ email, password }: RegisterProps) => Promise<void>,
    loading: boolean,
}

export const AuthContext = createContext<AuthContextType | null>(null);