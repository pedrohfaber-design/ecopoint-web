import { useEffect, useState } from "react";
import {
    Loader2,
    MessageCircle,
    Send,
} from "lucide-react";

import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface ChatMessage {
    id: string;
    request_id: string;
    sender_id: string;
    sender_name: string;
    message: string;
    created_at: string;
}

interface RequestChatProps {
    requestId: string;
}

export default function RequestChat({
    requestId,
}: RequestChatProps) {
    const { user } = useAuth();

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    async function loadMessages() {
        try {
            const response = await apiFetch(
                `/api/chat/messages/${requestId}`
            );

            setMessages(response.data ?? []);
            setError("");
        } catch (err) {
            console.error(
                "Erro ao carregar mensagens:",
                err
            );

            setError(
                "Não foi possível carregar a conversa."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMessages();

        const interval = window.setInterval(
            loadMessages,
            4000
        );

        return () => {
            window.clearInterval(interval);
        };
    }, [requestId]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage || sending) {
            return;
        }

        try {
            setSending(true);
            setError("");

            await apiFetch(
                `/api/chat/messages/${requestId}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        message: trimmedMessage,
                    }),
                }
            );

            setMessage("");

            await loadMessages();
        } catch (err) {
            console.error(
                "Erro ao enviar mensagem:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível enviar a mensagem."
            );
        } finally {
            setSending(false);
        }
    }

    function formatDate(date: string) {
        return new Date(date).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return (
        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageCircle size={22} />
                </div>

                <div>
                    <h2 className="font-bold text-slate-900">
                        Conversa
                    </h2>

                    <p className="text-sm text-slate-500">
                        Comunicação sobre esta solicitação
                    </p>
                </div>
            </div>

            {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="max-h-[420px] min-h-[220px] space-y-3 overflow-y-auto rounded-xl bg-slate-50 p-4">

                {loading ? (
                    <div className="flex h-48 items-center justify-center">
                        <Loader2
                            size={24}
                            className="animate-spin text-emerald-600"
                        />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex h-48 items-center justify-center text-center">
                        <div>
                            <MessageCircle
                                size={32}
                                className="mx-auto mb-3 text-slate-300"
                            />

                            <p className="text-sm font-medium text-slate-500">
                                Nenhuma mensagem ainda.
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Envie uma mensagem para iniciar a conversa.
                            </p>
                        </div>
                    </div>
                ) : (
                    messages.map((item) => {
                        const isMine =
                            item.sender_id === user?.id;

                        return (
                            <div
                                key={item.id}
                                className={`flex ${
                                    isMine
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                        isMine
                                            ? "bg-emerald-600 text-white"
                                            : "bg-white text-slate-700 shadow-sm"
                                    }`}
                                >
                                    <div className="mb-1 flex items-center justify-between gap-4">
                                        <span
                                            className={`text-xs font-semibold ${
                                                isMine
                                                    ? "text-emerald-100"
                                                    : "text-slate-500"
                                            }`}
                                        >
                                            {isMine
                                                ? "Você"
                                                : item.sender_name}
                                        </span>

                                        <span
                                            className={`text-[11px] ${
                                                isMine
                                                    ? "text-emerald-100"
                                                    : "text-slate-400"
                                            }`}
                                        >
                                            {formatDate(
                                                item.created_at
                                            )}
                                        </span>
                                    </div>

                                    <p className="whitespace-pre-wrap break-words text-sm">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}

            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-4 flex gap-3"
            >
                <input
                    type="text"
                    value={message}
                    onChange={(event) =>
                        setMessage(event.target.value)
                    }
                    placeholder="Digite sua mensagem..."
                    maxLength={1000}
                    disabled={sending}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
                />

                <button
                    type="submit"
                    disabled={
                        sending ||
                        message.trim().length === 0
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {sending ? (
                        <Loader2
                            size={18}
                            className="animate-spin"
                        />
                    ) : (
                        <Send size={18} />
                    )}

                    Enviar
                </button>
            </form>

        </div>
    );
}