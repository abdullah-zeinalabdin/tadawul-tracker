import { createContext } from "react";
import type { LoginProps, RegisterProps } from "./AuthProvider";

interface AuthContextType {
    userData: { email: string } | null,
    login: ({ email, password }: LoginProps) => Promise<void>,
    logout: (message?: string | null) => Promise<void>,
    register: ({ email, password }: RegisterProps) => Promise<void>,
    loading: boolean,
    logoutMessage: string | null,
    clearLogoutMessage: () => void,
};

export interface Creds {
    email: string,
    password: string,
}

export type CredsType = "email" | "password";

export const AuthContext = createContext<AuthContextType | null>(null);