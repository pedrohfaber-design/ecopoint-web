import { Outlet, NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    ClipboardList,
    MapPin,
    Recycle,
    LogOut,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function AdminLayout() {
    const { logout } = useAuth();

    return (
        <div className="flex min-h-screen bg-slate-50">

            <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">

                <div className="flex h-20 items-center border-b border-slate-100 px-6">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            EcoPoint
                        </h1>

                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                            Administração
                        </p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2 p-4">

                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                isActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                            }`
                        }
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/solicitacoes"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                isActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                            }`
                        }
                    >
                        <ClipboardList size={20} />
                        Solicitações
                    </NavLink>

                    <NavLink
                        to="/admin/ecopontos"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                isActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                            }`
                        }
                    >
                        <MapPin size={20} />
                        Ecopontos
                    </NavLink>

                    <NavLink
                        to="/admin/residuos"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                isActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                            }`
                        }
                    >
                        <Recycle size={20} />
                        Resíduos
                    </NavLink>

                </nav>

                <div className="border-t border-slate-100 p-4">

                    <button
                        type="button"
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={20} />
                        Sair
                    </button>

                </div>

            </aside>

            <main className="flex-1">
                <Outlet />
            </main>

        </div>
    );
}