import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface LoginFormData {
    email: string;
    password: string;
}

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    city: string;
    state: string;
}

export default function AuthPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loginForm = useForm<LoginFormData>();
    const registerForm = useForm<RegisterFormData>();

    async function handleLogin(data: LoginFormData) {
        setError("");
        setSuccess("");

        try {
            const response = await apiFetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify({
                    email: data.email.trim().toLowerCase(),
                    password: data.password,
                }),
            });

            console.log("Resposta do login:", response);

            if (!response?.success) {
                throw new Error(
                    response?.message || "Não foi possível realizar o login."
                );
            }

            if (!response.token || !response.user) {
                throw new Error(
                    "O servidor não retornou os dados de autenticação."
                );
            }

            login(response.token, response.user);

            if (response.user.role === "Admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }
        } catch (err) {
            console.error("Erro no login:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "E-mail ou senha inválidos."
            );
        }
    }

    async function handleRegister(data: RegisterFormData) {
        setError("");
        setSuccess("");

        try {
            const payload = {
                name: data.name.trim(),
                email: data.email.trim().toLowerCase(),
                password: data.password,
                city: data.city.trim(),
                state: data.state.trim().toUpperCase(),
            };

            console.log("Dados enviados no cadastro:", {
                ...payload,
                password: "***",
            });

            const response = await apiFetch("/api/users/register", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            console.log("Resposta completa do cadastro:", response);

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                        "Não foi possível criar a conta."
                );
            }

            setSuccess(
                "Conta criada com sucesso! Agora você já pode fazer login."
            );

            registerForm.reset();

            setTimeout(() => {
                setIsRegistering(false);
                setSuccess("");
            }, 1500);
        } catch (err) {
            console.error("Erro no cadastro:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível criar a conta."
            );
        }
    }

    function handleForgotPassword() {
        navigate("/forgot-password");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-6 py-12">

            <div className="w-full max-w-md">

                {/* Logo */}

                <div className="mb-8 text-center">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-3xl font-bold text-emerald-600"
                    >
                        EcoPoint
                    </button>

                    <p className="mt-2 text-slate-500">
                        {isRegistering
                            ? "Crie sua conta"
                            : "Entre na sua conta"}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">

                    {/* Mensagem de erro */}

                    {error && (
                        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Mensagem de sucesso */}

                    {success && (
                        <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                            {success}
                        </div>
                    )}

                    {/* LOGIN */}

                    {!isRegistering ? (
                        <form
                            onSubmit={loginForm.handleSubmit(handleLogin)}
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="login-email"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    E-mail
                                </label>

                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    {...loginForm.register("email", {
                                        required: "Informe seu e-mail",
                                    })}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                {loginForm.formState.errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {
                                            loginForm.formState.errors
                                                .email.message
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="login-password"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Senha
                                </label>

                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...loginForm.register("password", {
                                        required: "Informe sua senha",
                                    })}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                {loginForm.formState.errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {
                                            loginForm.formState.errors
                                                .password.message
                                        }
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                            >
                                Entrar
                            </button>

                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="w-full text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
                            >
                                Esqueci minha senha
                            </button>

                            <div className="border-t border-slate-100 pt-5 text-center">
                                <p className="text-sm text-slate-500">
                                    Ainda não possui uma conta?
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setError("");
                                        setSuccess("");
                                        setIsRegistering(true);
                                    }}
                                    className="mt-2 font-semibold text-emerald-600 hover:text-emerald-700"
                                >
                                    Criar conta
                                </button>
                            </div>
                        </form>
                    ) : (

                        /* CADASTRO */

                        <form
                            onSubmit={registerForm.handleSubmit(
                                handleRegister
                            )}
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="register-name"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Nome
                                </label>

                                <input
                                    id="register-name"
                                    type="text"
                                    placeholder="Seu nome"
                                    {...registerForm.register("name", {
                                        required: "Informe seu nome",
                                    })}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                {registerForm.formState.errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {
                                            registerForm.formState.errors
                                                .name.message
                                        }
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
                                    {...registerForm.register("email", {
                                        required: "Informe seu e-mail",
                                    })}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                {registerForm.formState.errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {
                                            registerForm.formState.errors
                                                .email.message
                                        }
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
                                    {...registerForm.register("password", {
                                        required: "Informe sua senha",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "A senha deve ter pelo menos 6 caracteres",
                                        },
                                    })}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                {registerForm.formState.errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {
                                            registerForm.formState.errors
                                                .password.message
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label
                                        htmlFor="register-city"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Cidade
                                    </label>

                                    <input
                                        id="register-city"
                                        type="text"
                                        placeholder="Cabreúva"
                                        {...registerForm.register("city", {
                                            required:
                                                "Informe sua cidade",
                                        })}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                    {registerForm.formState.errors.city && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                registerForm.formState
                                                    .errors.city.message
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="register-state"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Estado
                                    </label>

                                    <input
                                        id="register-state"
                                        type="text"
                                        maxLength={2}
                                        placeholder="SP"
                                        {...registerForm.register("state", {
                                            required:
                                                "Informe seu estado",
                                            minLength: {
                                                value: 2,
                                                message:
                                                    "Use a sigla do estado",
                                            },
                                        })}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 uppercase outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                    {registerForm.formState.errors.state && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                registerForm.formState
                                                    .errors.state.message
                                            }
                                        </p>
                                    )}
                                </div>

                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                            >
                                Criar conta
                            </button>

                            <div className="border-t border-slate-100 pt-5 text-center">
                                <p className="text-sm text-slate-500">
                                    Já possui uma conta?
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setError("");
                                        setSuccess("");
                                        setIsRegistering(false);
                                    }}
                                    className="mt-2 font-semibold text-emerald-600 hover:text-emerald-700"
                                >
                                    Voltar para login
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}