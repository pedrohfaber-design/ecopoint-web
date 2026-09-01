import { useEffect, useState } from "react";
import {
    ClipboardList,
    Clock,
    CheckCircle2,
    XCircle,
    Loader2,
    Recycle,
} from "lucide-react";

import { apiFetch } from "@/services/api";
import { Link } from "react-router-dom";

interface DisposalRequest {
    id: string;
    user_id: string;
    collection_point_id: string;
    status: "Pending" | "Approved" | "Completed" | "Cancelled";
    created_at: string;
    updated_at: string;
}

export default function MyRequestsPage() {
    const [requests, setRequests] = useState<DisposalRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadRequests() {
            try {
                const response = await apiFetch("/api/disposal-requests/my");

                console.log("Minhas solicitações:", response);

                setRequests(response.data ?? []);
            } catch (err) {
                console.error("Erro ao carregar solicitações:", err);
                setError("Não foi possível carregar suas solicitações.");
            } finally {
                setLoading(false);
            }
        }

        loadRequests();
    }, []);

    function getStatusLabel(status: DisposalRequest["status"]) {
        switch (status) {
            case "Pending":
                return "Pendente";

            case "Approved":
                return "Aprovada";

            case "Completed":
                return "Concluída";

            case "Cancelled":
                return "Cancelada";

            default:
                return status;
        }
    }

    function getStatusClass(status: DisposalRequest["status"]) {
        switch (status) {
            case "Pending":
                return "bg-yellow-50 text-yellow-700";

            case "Approved":
                return "bg-blue-50 text-blue-700";

            case "Completed":
                return "bg-emerald-50 text-emerald-700";

            case "Cancelled":
                return "bg-red-50 text-red-700";

            default:
                return "bg-slate-50 text-slate-700";
        }
    }

    function getStatusIcon(status: DisposalRequest["status"]) {
        switch (status) {
            case "Pending":
                return <Clock size={16} />;

            case "Approved":
                return <CheckCircle2 size={16} />;

            case "Completed":
                return <CheckCircle2 size={16} />;

            case "Cancelled":
                return <XCircle size={16} />;

            default:
                return <ClipboardList size={16} />;
        }
    }

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-3 text-slate-500">
                    <Loader2 className="animate-spin" size={22} />
                    <span>Carregando solicitações...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                    <XCircle
                        className="mx-auto mb-3 text-red-500"
                        size={32}
                    />

                    <p className="font-medium text-red-700">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">

            {/* Cabeçalho */}

            <div className="mb-10">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <ClipboardList size={24} />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Minhas Solicitações
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Acompanhe suas solicitações de descarte.
                        </p>
                    </div>
                </div>
            </div>

            {/* Nenhuma solicitação */}

            {requests.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Recycle size={30} />
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Nenhuma solicitação encontrada
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                        Você ainda não possui solicitações de descarte.
                        Quando realizar uma, ela aparecerá aqui.
                    </p>
                </div>
            ) : (

                /* Lista */

                <div className="space-y-4">

                    {requests.map((request) => (
                        <div
                            key={request.id}
                            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                        >

                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                {/* Informações */}

                                <div className="flex items-start gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <Recycle size={23} />
                                    </div>

                                    <div>

                                        <h2 className="font-semibold text-slate-900">
                                            Solicitação de descarte
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Realizada em{" "}
                                            {formatDate(request.created_at)}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            ID: {request.id}
                                        </p>

                                    </div>
                                </div>

                                {/* Status */}

                                <div
                                    className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                                        request.status
                                    )}`}
                                >
                                    {getStatusIcon(request.status)}

                                    {getStatusLabel(request.status)}
                                </div>

                            </div>
                            <Link
    to={`/dashboard/solicitacoes/${request.id}`}
    className="inline-flex items-center justify-center rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
>
    Detalhes
</Link>

                            {/* Rodapé */}

                            <div className="mt-5 border-t border-slate-100 pt-4">

                                <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

                                    <span>
                                        Última atualização:{" "}
                                        {formatDate(request.updated_at)}
                                    </span>

                                    <span className="text-xs text-slate-400">
                                        Ponto de coleta:{" "}
                                        {request.collection_point_id}
                                    </span>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}