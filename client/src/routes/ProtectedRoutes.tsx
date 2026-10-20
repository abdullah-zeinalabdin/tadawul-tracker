import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/Authentication/useAuth";
import { CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
    children: ReactNode,
}

export default function ProtectedRoutes({ children }: ProtectedRouteProps) {
    const { userData, loading, logoutMessage } = useAuth();

    if(loading) {
        return <CircularProgress />
    }

    if(!userData) {
        return <Navigate to="/login" state={{ message: logoutMessage }} replace />
    }

    return children
}