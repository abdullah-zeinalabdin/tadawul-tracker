import { createContext } from "react";
import type { LoginProps } from "./AuthProvider";

interface AuthContextType {
    userData: { email: string } | null,
    login: ({ email, password }: LoginProps) => Promise<void>,
    logout: () => void,
    loading: boolean,
}

export const AuthContext = createContext<AuthContextType | null>(null);