import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/Authentication/useAuth";

interface ProtectedRouteProps {
    children: ReactNode,
}

export default function ProtectedRoutes({ children }: ProtectedRouteProps) {
    const { userData } = useAuth();

    if(!userData) {
        return <Navigate to="/login" replace />
    }

    return children
}