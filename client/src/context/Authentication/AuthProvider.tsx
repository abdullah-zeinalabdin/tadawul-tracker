import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode,
}

export interface LoginProps {
    email: string,
    password: string,
}

export interface RegisterProps {
    email: string,
    password: string,
    // TODO: MORE FIELDS LATER
}

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    throw new Error("VITE_API_URL is not set");
}

export const AuthProvider = ( { children }: AuthProviderProps) => {
    const [userData, setUserData] = useState<{ email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuth = async() => {
            try {
                const response = await fetch(`${apiUrl}/users/me`, {credentials: "include"});

                if(!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }

                const data = await response.json();

                setUserData({email: data.email});
            }
            catch(error) {
                console.error('Fetch operation failed:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAuth();
    }, [])

    const login = async({ email, password }: LoginProps) => {
        const response = await fetch(`${apiUrl}/users/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Login failed");
        }
        setUserData({ email });
    }

    const logout = async( message: string | null = null ) => {
        const response = await fetch(`${apiUrl}/users/logout`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        setLogoutMessage(message);
        setUserData(null);
        
        if(!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Logout failed");
        }
    }

    const clearLogoutMessage = () => {
        setLogoutMessage(null);
    }

    const register = async({ email, password }: RegisterProps) => {
        const response = await fetch(`${apiUrl}/users/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });

        if(!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Registration failed");
        }

        console.log("Register Successfully");
    }

    return (
        <AuthContext.Provider value={{ userData, login, logout, register, loading, logoutMessage, clearLogoutMessage }}>
            { children }
        </AuthContext.Provider>
    )
}