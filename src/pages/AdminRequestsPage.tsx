import { useEffect, useState } from "react";
import {
    CheckCircle2,
    Clock3,
    Eye,
    Loader2,
    XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { apiFetch } from "@/services/api";

interface DisposalRequest {
    id: string;
    user_id: string;
    collection_point_id: string;
    status: "Pending" | "Approved" | "Completed" | "Cancelled";
    created_at: string;
    updated_at: string;
}

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<DisposalRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    async function loadRequests() {
        try {
            setLoading(true);
            setError("");

            const response = await apiFetch(
                "/api/disposal-requests"
            );

            setRequests(response.data ?? []);
        } catch (err) {
            console.error(
                "Erro ao carregar solicitações:",
                err
            );

            setError(
                "Não foi possível carregar as solicitações."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRequests();
    }, []);

    async function updateStatus(
        id: string,
        status: DisposalRequest["status"]
    ) {
        try {
            setUpdatingId(id);

            await apiFetch(
                `/api/disposal-requests/${id}/status`,
                {
                    method: "PATCH",
                    body: JSON.stringify(status),
                }
            );

            await loadRequests();
        } catch (err) {
            console.error(
                "Erro ao atualizar status:",
                err
            );

            setError(
                "Não foi possível atualizar o status."
            );
        } finally {
            setUpdatingId(null);
        }
    }

    function getStatusInfo(
        status: DisposalRequest["status"]
    ) {
        switch (status) {
            case "Pending":
                return {
                    label: "Pendente",
                    className:
                        "bg-yellow-50 text-yellow-700",
                    icon: Clock3,
                };

            case "Approved":
                return {
                    label: "Aprovada",
                    className:
                        "bg-blue-50 text-blue-700",
                    icon: CheckCircle2,
                };

            case "Completed":
                return {
                    label: "Concluída",
                    className:
                        "bg-emerald-50 text-emerald-700",
                    icon: CheckCircle2,
                };

            case "Cancelled":
                return {
                    label: "Cancelada",
                    className:
                        "bg-red-50 text-red-700",
                    icon: XCircle,
                };
        }
    }

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-3 text-slate-500">
                    <Loader2
                        size={22}
                        className="animate-spin"
                    />
                    Carregando solicitações...
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Solicitações
                </h1>

                <p className="mt-2 text-slate-500">
                    Gerencie as solicitações de descarte dos usuários.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {requests.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
                    <p className="text-slate-500">
                        Nenhuma solicitação encontrada.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => {
                        const status = getStatusInfo(
                            request.status
                        );

                        const StatusIcon = status.icon;

                        const isUpdating =
                            updatingId === request.id;

                        return (
                            <div
                                key={request.id}
                                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                            >
                                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            Solicitação de descarte
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Criada em{" "}
                                            {formatDate(
                                                request.created_at
                                            )}
                                        </p>

                                        <p className="mt-1 break-all font-mono text-xs text-slate-400">
                                            {request.id}
                                        </p>
                                    </div>

                                    <div
                                        className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.className}`}
                                    >
                                        <StatusIcon size={16} />
                                        {status.label}
                                    </div>

                                    <div className="flex flex-wrap gap-2">

                                        <Link
                                            to={`/admin/solicitacoes/${request.id}`}
                                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
                                        >
                                            <Eye size={16} />
                                            Detalhes
                                        </Link>

                                        {request.status === "Pending" && (
                                            <>
                                                <button
                                                    type="button"
                                                    disabled={isUpdating}
                                                    onClick={() =>
                                                        updateStatus(
                                                            request.id,
                                                            "Approved"
                                                        )
                                                    }
                                                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    Aprovar
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={isUpdating}
                                                    onClick={() =>
                                                        updateStatus(
                                                            request.id,
                                                            "Cancelled"
                                                        )
                                                    }
                                                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        )}

                                        {request.status === "Approved" && (
                                            <button
                                                type="button"
                                                disabled={isUpdating}
                                                onClick={() =>
                                                    updateStatus(
                                                        request.id,
                                                        "Completed"
                                                    )
                                                }
                                                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                            >
                                                Concluir
                                            </button>
                                        )}

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}