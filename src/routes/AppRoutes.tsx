import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AdminLayout from "@/layouts/AdminLayout";

import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";

import DashboardPage from "@/pages/DashboardPage";
import NewDisposalPage from "@/pages/NewDisposalPage";
import MyRequestsPage from "@/pages/MyRequestsPage";
import DisposalRequestDetailsPage from "@/pages/DisposalRequestDetailsPage";
import CollectionPointsPage from "@/pages/CollectionPointsPage";

import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminRequestsPage from "@/pages/AdminRequestsPage";
import AdminCollectionPointsPage from "@/pages/AdminCollectionPointsPage";
import AdminWasteTypesPage from "@/pages/AdminWasteTypesPage";
import AdminDisposalRequestDetailsPage from "@/pages/AdminDisposalRequestDetailsPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* =========================
                    ÁREA PÚBLICA
                ========================== */}

                <Route element={<PublicLayout />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                </Route>


                {/* =========================
                    AUTENTICAÇÃO
                    NÃO PROTEGIDA
                ========================== */}

                <Route
                    path="/auth"
                    element={<AuthPage />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                />


                {/* =========================
                    ÁREA DO USUÁRIO
                ========================== */}

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/dashboard/novo-descarte"
                        element={<NewDisposalPage />}
                    />

                    <Route
                        path="/dashboard/meus-descartes"
                        element={<MyRequestsPage />}
                    />

                    <Route
                        path="/dashboard/solicitacoes"
                        element={<MyRequestsPage />}
                    />

                    <Route
                        path="/dashboard/solicitacoes/:id"
                        element={<DisposalRequestDetailsPage />}
                    />

                    <Route
                        path="/dashboard/ecopontos"
                        element={<CollectionPointsPage />}
                    />

                </Route>


                {/* =========================
                    ÁREA ADMINISTRATIVA
                ========================== */}

                <Route
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >

                    <Route
                        path="/admin"
                        element={<AdminDashboardPage />}
                    />

                    <Route
                        path="/admin/solicitacoes"
                        element={<AdminRequestsPage />}
                    />

                    <Route
                        path="/admin/ecopontos"
                        element={<AdminCollectionPointsPage />}
                    />
                    <Route
    element={
        <AdminRoute>
            <AdminLayout />
        </AdminRoute>
    }
></Route>
<Route
    path="/admin/solicitacoes/:id"
    element={<AdminDisposalRequestDetailsPage />}
/>

                    <Route
                        path="/admin/residuos"
                        element={<AdminWasteTypesPage />}
                    />
                    


                </Route>

            </Routes>
        </BrowserRouter>
    );
}