import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRoutes from "@/routes/AppRoutes";
import { AuthProvider } from "@/context/AuthContext";

import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </StrictMode>
);