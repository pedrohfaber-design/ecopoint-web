import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    registerSchema,
    type RegisterFormData,
} from "@/schemas/auth";

export default function RegisterForm() {
    const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
});
    function onSubmit(data: RegisterFormData) {
        console.log("Cadastro:", data);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
        >
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Nome completo
                </label>

                <input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    {...register("name", {
                        required: "Informe seu nome",
                    })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="register-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    E-mail
                </label>

                <input
                    id="register-email"
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
                    htmlFor="register-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Senha
                </label>

                <input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                        required: "Informe sua senha",
                        minLength: {
                            value: 6,
                            message: "A senha deve ter pelo menos 6 caracteres",
                        },
                    })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Confirmar senha
                </label>

                <input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                        required: "Confirme sua senha",
                    })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
                Criar conta
            </button>
        </form>
    );
}