import {
    ClipboardList,
    MapPin,
    Recycle,
    Users,
} from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <div className="p-8">

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard Administrativo
                </h1>

                <p className="mt-2 text-slate-500">
                    Gerencie o EcoPoint e acompanhe as atividades da plataforma.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <ClipboardList size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Solicitações
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        0
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Total de solicitações
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <MapPin size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Ecopontos
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        0
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Pontos cadastrados
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <Recycle size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Resíduos
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        0
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Tipos cadastrados
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Users size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Usuários
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        0
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Usuários cadastrados
                    </p>
                </div>

            </div>

            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                    Área administrativa
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Use o menu lateral para gerenciar solicitações,
                    ecopontos e tipos de resíduos.
                </p>
            </div>

        </div>
    );
}