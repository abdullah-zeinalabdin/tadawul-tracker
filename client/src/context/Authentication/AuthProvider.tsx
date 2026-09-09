import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode,
}

export interface LoginProps {
    email: string,
    password: string,
}

export const AuthProvider = ( { children }: AuthProviderProps) => {
    const [userData, setUserData] = useState<{ email: string } | null>(null);

    useEffect(() => {
        const fetchAuth = async() => {
            try {
                const response = await fetch("http://localhost:4000/users/me", {credentials: "include"});

                if(!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }

                const data = await response.json();

                setUserData({email: data.email});
            }
            catch(error) {
                console.error('Fetch operation failed:', error);
            }
        };
        fetchAuth();
    }, [])

    const login = async({ email, password }: LoginProps) => {
        const response = await fetch("http://localhost:4000/users/login", {
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

    const logout = async() => {
        const response = await fetch("http://localhost:4000/users/logout", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        setUserData(null);
        
        if(!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Logout failed");
        }
    }
    return (
        <AuthContext.Provider value={{ userData, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}