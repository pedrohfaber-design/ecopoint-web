import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    loginSchema,
    type LoginFormData,
} from "@/schemas/auth";
const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";
export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormData) {
        try {
            const response = await fetch(
    `${API_URL}/api/users/login`,
    {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Erro ao realizar login."
                );
            }

            console.log("Login realizado:", result);

            login(result.token, result.user);

console.log("Autenticação salva com sucesso!");

if (result.user.role?.toLowerCase() === "admin") {
    navigate("/admin", {
        replace: true,
    });
    
} else {
    navigate("/dashboard", {
        replace: true,
    });
}
        } catch (error) {
            console.error("Erro no login:", error);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
        >
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    E-mail
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register("email", {
                        required: "Informe seu e-mail",
                    })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Senha
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                        required: "Informe sua senha",
                    })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
                Entrar
            </button>

            <Link
    to="/forgot-password"
    className="block w-full text-center text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
>
    Esqueci minha senha
</Link>
        </form>
    );
}