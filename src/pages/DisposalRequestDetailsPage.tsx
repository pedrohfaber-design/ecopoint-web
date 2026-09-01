import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock,
    MapPin,
    Package,
    XCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { apiFetch } from "@/services/api";
import RequestChat from "@/components/chat/RequestChat";

interface DisposalItem {
    id: string;
    waste_type_id: string;
    waste_type_name: string;
    quantity: number;
}

interface DisposalRequestDetails {
    id: string;
    user_id: string;

    collection_point_id: string;
    collection_point_name: string;
    collection_point_city: string;
    collection_point_state: string;

    status: "Pending" | "Approved" | "Completed" | "Cancelled";

    created_at: string;
    updated_at: string;

    items: DisposalItem[];
}

export default function DisposalRequestDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const [request, setRequest] =
        useState<DisposalRequestDetails | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            setError("Solicitação não informada.");
            setLoading(false);
            return;
        }

        async function loadRequest() {
            try {
                const response = await apiFetch(
                    `/api/disposal-requests/${id}/details`
                );

                console.log("Detalhes da solicitação:", response);

                setRequest(response.data);
            } catch (err) {
                console.error(
                    "Erro ao carregar solicitação:",
                    err
                );

                setError(
                    "Não foi possível carregar os detalhes da solicitação."
                );
            } finally {
                setLoading(false);
            }
        }

        loadRequest();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-slate-500">
                    Carregando solicitação...
                </p>
            </div>
        );
    }

    if (error || !request) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p className="text-red-500">
                    {error || "Solicitação não encontrada."}
                </p>

                <Link
                    to="/dashboard/solicitacoes"
                    className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                    Voltar para solicitações
                </Link>
            </div>
        );
    }

    const statusConfig = {
        Pending: {
            label: "Pendente",
            className:
                "bg-yellow-50 text-yellow-700",
            icon: Clock,
        },

        Approved: {
            label: "Aprovada",
            className:
                "bg-blue-50 text-blue-700",
            icon: CheckCircle2,
        },

        Completed: {
            label: "Concluída",
            className:
                "bg-emerald-50 text-emerald-700",
            icon: CheckCircle2,
        },

        Cancelled: {
            label: "Cancelada",
            className:
                "bg-red-50 text-red-700",
            icon: XCircle,
        },
    };

    const status = statusConfig[request.status];
    const StatusIcon = status.icon;

    const createdAt = new Date(
        request.created_at
    ).toLocaleString("pt-BR");

    return (
        <div className="p-8">

            {/* Voltar */}

            <Link
                to="/dashboard/solicitacoes"
                className="mb-8 inline-flex items-center gap-2 font-medium text-slate-500 transition hover:text-emerald-600"
            >
                <ArrowLeft size={18} />

                Voltar para solicitações
            </Link>


            {/* Cabeçalho */}

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <p className="text-sm font-medium text-slate-400">
                        Solicitação
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-slate-900">
                        Detalhes do descarte
                    </h1>

                </div>


                <div
                    className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.className}`}
                >
                    <StatusIcon size={18} />

                    {status.label}
                </div>

            </div>


            {/* Informações gerais */}

            <div className="grid gap-6 lg:grid-cols-2">


                {/* Ecoponto */}

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <MapPin size={22} />
                        </div>

                        <div>

                            <h2 className="font-bold text-slate-900">
                                Ecoponto
                            </h2>

                            <p className="text-sm text-slate-500">
                                Local de entrega
                            </p>

                        </div>

                    </div>


                    <h3 className="text-lg font-semibold text-slate-900">
                        {request.collection_point_name}
                    </h3>

                    <p className="mt-2 text-slate-500">
                        {request.collection_point_city} -{" "}
                        {request.collection_point_state}
                    </p>

                </div>


                {/* Data */}

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <CalendarDays size={22} />
                        </div>

                        <div>

                            <h2 className="font-bold text-slate-900">
                                Solicitação
                            </h2>

                            <p className="text-sm text-slate-500">
                                Data de criação
                            </p>

                        </div>

                    </div>


                    <p className="text-lg font-semibold text-slate-900">
                        {createdAt}
                    </p>

                </div>

            </div>


            {/* Resíduos */}

            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Package size={22} />
                    </div>

                    <div>

                        <h2 className="font-bold text-slate-900">
                            Resíduos
                        </h2>

                        <p className="text-sm text-slate-500">
                            Itens incluídos nesta solicitação
                        </p>

                    </div>

                </div>
                <RequestChat requestId={request.id} />


                {request.items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
                        <p className="text-sm text-slate-400">
                            Nenhum resíduo registrado.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">

                        {request.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                            >

                                <div>

                                    <p className="font-semibold text-slate-900">
                                        {item.waste_type_name}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Resíduo eletrônico
                                    </p>

                                </div>


                                <div className="rounded-lg bg-slate-50 px-4 py-2">

                                    <span className="font-semibold text-slate-700">
                                        {item.quantity}
                                    </span>

                                    <span className="ml-1 text-sm text-slate-500">
                                        unidade
                                        {item.quantity !== 1
                                            ? "s"
                                            : ""}
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}