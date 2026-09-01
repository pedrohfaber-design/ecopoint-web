import {
    LayoutDashboard,
    MapPin,
    Recycle,
    ClipboardList,
    LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white">

            {/* Logo */}

            <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">

                <div className="rounded-xl bg-emerald-500 p-2 text-white shadow">
                    <Recycle size={22} />
                </div>

                <span className="text-xl font-bold text-slate-900">
                    EcoPoint
                </span>

            </div>

            {/* Menu */}

            <nav className="flex-1 space-y-2 p-4">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-600"
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </Link>

                <Link
                    to="/dashboard/ecopontos"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600"
                >
                    <MapPin size={20} />
                    Ecopontos
                </Link>

                <Link
                    to="/dashboard/solicitacoes"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600"
                >
                    <ClipboardList size={20} />
                    Solicitações
                </Link>

            </nav>

            {/* Sair */}

            <div className="border-t border-slate-100 p-4">

                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut size={20} />
                    Sair
                </button>

            </div>

        </aside>
    );
}