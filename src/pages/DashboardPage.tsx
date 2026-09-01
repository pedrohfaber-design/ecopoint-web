import {
    CheckCircle2,
    ClipboardList,
    Recycle,
    Clock3,
    XCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";


interface DashboardRequest {
    id?: string;
    status?: string;
    created_at?: string;
}

interface DashboardData {
    approved: number;
    cancelled: number;
    completed: number;
    pending: number;
    last_requests: DashboardRequest[];
}

export default function DashboardPage() {
    const { user } = useAuth();

    const [dashboard, setDashboard] =
        useState<DashboardData | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                if (!user) {
    return;
}

const response = await apiFetch(
    `/api/user-dashboard/${user.id}`
);

                console.log("Dashboard:", response);

                setDashboard(response.data);
            } catch (err) {
                console.error(
                    "Erro ao carregar dashboard:",
                    err
                );

                setError(
                    "Não foi possível carregar os dados do dashboard."
                );
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [user?.id]);

    // ==============================
    // CARREGANDO
    // ==============================

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

                    <p className="text-slate-500">
                        Carregando seu dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // ==============================
    // ERRO
    // ==============================

    if (error) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="rounded-2xl border border-red-100 bg-red-50 px-8 py-6 text-center">
                    <p className="font-medium text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    // ==============================
    // DADOS
    // ==============================

    const pending = dashboard?.pending ?? 0;
    const approved = dashboard?.approved ?? 0;
    const completed = dashboard?.completed ?? 0;
    const cancelled = dashboard?.cancelled ?? 0;

    // ==============================
    // DASHBOARD
    // ==============================

    return (
        <div className="p-8">

            {/* ==========================
                CABEÇALHO
            ========================== */}

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
        <h1 className="text-3xl font-bold text-slate-900">
            Olá, {user?.name}! 👋
        </h1>

        <p className="mt-2 text-slate-500">
            Bem-vindo ao seu painel do EcoPoint.
        </p>
    </div>

    <div className="mt-6">

</div>

    <Link
        to="/dashboard/novo-descarte"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
    >
        <Recycle size={20} />

        Solicitar descarte
    </Link>
</div>

            {/* ==========================
                CARDS
            ========================== */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {/* Pendentes */}

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <Clock3 size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Pendentes
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {pending}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Aguardando atendimento
                    </p>

                </div>


                {/* Aprovadas */}

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <ClipboardList size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Aprovadas
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {approved}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Solicitações aprovadas
                    </p>

                </div>



                {/* Concluídas */}

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <CheckCircle2 size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Concluídas
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {completed}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Descartes concluídos
                    </p>

                </div>


                {/* Canceladas */}

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                        <XCircle size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Canceladas
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {cancelled}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Solicitações canceladas
                    </p>

                </div>

            </div>


            {/* ==========================
                RESUMO
            ========================== */}

            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        Resumo das solicitações
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Acompanhe a situação das suas solicitações.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl bg-amber-50 p-4">
                        <p className="text-sm text-amber-700">
                            Pendentes
                        </p>

                        <p className="mt-1 text-2xl font-bold text-amber-800">
                            {pending}
                        </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4">
                        <p className="text-sm text-blue-700">
                            Aprovadas
                        </p>

                        <p className="mt-1 text-2xl font-bold text-blue-800">
                            {approved}
                        </p>
                    </div>

                    <div className="rounded-xl bg-emerald-50 p-4">
                        <p className="text-sm text-emerald-700">
                            Concluídas
                        </p>

                        <p className="mt-1 text-2xl font-bold text-emerald-800">
                            {completed}
                        </p>
                    </div>

                    <div className="rounded-xl bg-red-50 p-4">
                        <p className="text-sm text-red-700">
                            Canceladas
                        </p>

                        <p className="mt-1 text-2xl font-bold text-red-800">
                            {cancelled}
                        </p>
                    </div>

                </div>

            </div>


            {/* ==========================
                ATIVIDADE RECENTE
            ========================== */}

            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        Atividade recente
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Acompanhe suas últimas solicitações.
                    </p>
                </div>


                {dashboard?.last_requests?.length === 0 ? (

                    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-200">

                        <div className="text-center">

                            <ClipboardList
                                className="mx-auto mb-3 text-slate-300"
                                size={36}
                            />

                            <p className="text-sm font-medium text-slate-500">
                                Nenhuma atividade registrada ainda.
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Suas solicitações aparecerão aqui.
                            </p>

                        </div>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {dashboard?.last_requests.map(
                            (request, index) => {

                                const status =
                                    request.status ??
                                    "PENDING";

                                let statusLabel = "Pendente";
                                let statusClass =
                                    "bg-amber-50 text-amber-700";

                                if (status === "APPROVED") {
                                    statusLabel = "Aprovada";
                                    statusClass =
                                        "bg-blue-50 text-blue-700";
                                }

                                if (status === "COMPLETED") {
                                    statusLabel = "Concluída";
                                    statusClass =
                                        "bg-emerald-50 text-emerald-700";
                                }

                                if (status === "CANCELLED") {
                                    statusLabel = "Cancelada";
                                    statusClass =
                                        "bg-red-50 text-red-700";
                                }

                                return (
                                    <div
                                        key={
                                            request.id ??
                                            index
                                        }
                                        className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                                    >

                                        <div>
                                            <p className="font-medium text-slate-800">
                                                Solicitação #
                                                {request.id ??
                                                    index + 1}
                                            </p>

                                            {request.created_at && (
                                                <p className="mt-1 text-xs text-slate-400">
                                                    {new Date(
                                                        request.created_at
                                                    ).toLocaleDateString(
                                                        "pt-BR"
                                                    )}
                                                </p>
                                            )}
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                                        >
                                            {statusLabel}
                                        </span>

                                    </div>
                                );
                            }
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}