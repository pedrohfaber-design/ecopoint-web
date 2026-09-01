import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    LockKeyhole,
    ArrowLeft,
    Loader2,
    CheckCircle2,
} from "lucide-react";

import { apiFetch } from "@/services/api";

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        if (!token) {
            setError("Token de recuperação inválido ou ausente.");
            setLoading(false);
            return;
        }

        if (password !== passwordConfirmation) {
            setError("As senhas não coincidem.");
            setLoading(false);
            return;
        }

        try {
            const response = await apiFetch("/api/users/reset-password", {
                method: "POST",
                body: JSON.stringify({
                    token,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            setMessage(
                response.message ?? "Senha redefinida com sucesso."
            );

            setPassword("");
            setPasswordConfirmation("");
        } catch (err) {
            console.error("Erro ao redefinir senha:", err);

            setError(
                "Não foi possível redefinir sua senha. O link pode ter expirado ou ser inválido."
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
                        <LockKeyhole size={30} />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900">
                        Redefinir senha
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Crie uma nova senha para acessar sua conta EcoPoint.
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
                                Senha redefinida!
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Sua senha foi alterada com sucesso.
                                Agora você já pode entrar novamente.
                            </p>

                            <Link
                                to="/auth"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Entrar no EcoPoint
                            </Link>

                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Nova senha
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Digite sua nova senha"
                                    required
                                    minLength={6}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="passwordConfirmation"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Confirmar senha
                                </label>

                                <input
                                    id="passwordConfirmation"
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(event) =>
                                        setPasswordConfirmation(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Digite novamente sua senha"
                                    required
                                    minLength={6}
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
                                disabled={loading || !token}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2
                                            size={20}
                                            className="animate-spin"
                                        />
                                        Redefinindo...
                                    </>
                                ) : (
                                    "Redefinir senha"
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