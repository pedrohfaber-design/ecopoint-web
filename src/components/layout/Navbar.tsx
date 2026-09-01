import { Link, useLocation, useNavigate } from "react-router-dom";
import { Recycle } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    function scrollToSection(id: string) {
        if (location.pathname === "/") {
            const section = document.getElementById(id);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }

            return;
        }

        navigate(`/#${id}`);
    }

    function scrollToTop() {
        if (location.pathname === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        navigate("/");
    }

    return (
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

            {/* Logo */}

            <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-3"
            >
                <div className="rounded-xl bg-emerald-500 p-2 text-white shadow-lg">
                    <Recycle size={22} />
                </div>

                <span className="text-2xl font-bold text-slate-900">
                    EcoPoint
                </span>
            </button>

            {/* Navegação */}

            <nav className="hidden gap-10 md:flex">

                <button
                    type="button"
                    onClick={scrollToTop}
                    className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                    Início
                </button>

                <button
                    type="button"
                    onClick={() => scrollToSection("ecopontos")}
                    className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                    Ecopontos
                </button>

                <button
                    type="button"
                    onClick={() => scrollToSection("como-funciona")}
                    className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                    Como funciona
                </button>

                <button
                    type="button"
                    onClick={() => scrollToSection("contato")}
                    className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                    Contato
                </button>

            </nav>

            {/* Autenticação */}

            <div className="flex items-center gap-4">

                {!isAuthenticated ? (
                    <>
                        <Link
                            to="/auth"
                            className="font-semibold text-slate-600 transition hover:text-emerald-600"
                        >
                            Entrar
                        </Link>

                        <Link
                            to="/auth"
                            className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                        >
                            Criar conta
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
    to={user?.role === "Admin" ? "/admin" : "/dashboard"}
    className="font-semibold text-slate-600 transition hover:text-emerald-600"
>
    Registrar Descarte
</Link>

                        <span className="font-semibold text-slate-700">
                            Olá, {user?.name} 👋
                        </span>

                        <button
                            type="button"
                            onClick={logout}
                            className="rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-slate-900"
                        >
                            Sair
                        </button>
                    </>
                )}

            </div>

        </div>
    );
}
