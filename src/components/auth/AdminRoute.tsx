import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "@/context/AuthContext";

interface AdminRouteProps {
    children: ReactNode;
}

export default function AdminRoute({
    children,
}: AdminRouteProps) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (user?.role !== "Admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}