import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

import { apiFetch } from "@/services/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await apiFetch("/api/users/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
            });

            setMessage(
                response.message ??
                    "Se o e-mail estiver cadastrado, enviaremos as instruções para recuperação."
            );
        } catch (err) {
            console.error("Erro ao solicitar recuperação:", err);

            setError(
                "Não foi possível processar a solicitação. Tente novamente."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-emerald-50 to-white px-6">
            <div className="w-full max-w-md">

                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                        <Mail size={30} />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900">
                        Esqueci minha senha
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Informe seu e-mail e enviaremos as instruções para
                        redefinir sua senha.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">

                    {message ? (
                        <div className="text-center">

                            <CheckCircle2
                                size={48}
                                className="mx-auto mb-4 text-emerald-500"
                            />

                            <h2 className="text-xl font-bold text-slate-900">
                                Solicitação enviada
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                {message}
                            </p>

                            <Link
                                to="/auth"
                                className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700"
                            >
                                <ArrowLeft size={18} />
                                Voltar para o login
                            </Link>

                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
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
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="seu@email.com"
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>

                            {error && (
                                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2
                                            size={20}
                                            className="animate-spin"
                                        />
                                        Enviando...
                                    </>
                                ) : (
                                    "Enviar link de recuperação"
                                )}
                            </button>

                            <Link
                                to="/auth"
                                className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
                            >
                                <ArrowLeft size={16} />
                                Voltar para o login
                            </Link>

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}