import { useEffect, useState } from "react";
import {
    Edit3,
    Loader2,
    MapPin,
    Plus,
    Trash2,
    X,
} from "lucide-react";

import { apiFetch } from "@/services/api";

interface CollectionPoint {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    phone?: string | null;
    email?: string | null;
}

interface FormData {
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    phone: string;
    email: string;
}

const emptyForm: FormData = {
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
};

export default function AdminCollectionPointsPage() {
    const [points, setPoints] = useState<CollectionPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [form, setForm] = useState<FormData>(emptyForm);

    async function loadPoints() {
        try {
            setLoading(true);
            setError("");

            const response = await apiFetch(
                "/api/collection-points"
            );

            setPoints(response.data ?? []);
        } catch (err) {
            console.error(err);
            setError("Não foi possível carregar os ecopontos.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPoints();
    }, []);

    function updateField(
        field: keyof FormData,
        value: string
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function openCreateForm() {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setSuccess("");
        setShowForm(true);
    }

    function openEditForm(point: CollectionPoint) {
        setEditingId(point.id);

        setForm({
            name: point.name,
            description: point.description,
            address: point.address,
            city: point.city,
            state: point.state,
            latitude: String(point.latitude),
            longitude: String(point.longitude),
            phone: point.phone ?? "",
            email: point.email ?? "",
        });

        setError("");
        setSuccess("");
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !form.name ||
            !form.address ||
            !form.city ||
            !form.state ||
            !form.latitude ||
            !form.longitude
        ) {
            setError(
                "Preencha todos os campos obrigatórios."
            );
            return;
        }

        try {
            setSaving(true);

            const body = {
                name: form.name,
                description: form.description,
                address: form.address,
                city: form.city,
                state: form.state,
                latitude: Number(form.latitude),
                longitude: Number(form.longitude),
                phone: form.phone || null,
                email: form.email || null,
            };

            if (editingId) {
                await apiFetch(
                    `/api/collection-points/${editingId}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(body),
                    }
                );

                setSuccess(
                    "Ecoponto atualizado com sucesso."
                );
            } else {
                await apiFetch(
                    "/api/collection-points",
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                    }
                );

                setSuccess(
                    "Ecoponto criado com sucesso."
                );
            }

            closeForm();
            await loadPoints();
        } catch (err) {
            console.error(err);
            setError(
                "Não foi possível salvar o ecoponto."
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        const confirmed = window.confirm(
            "Tem certeza que deseja excluir este ecoponto?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await apiFetch(
                `/api/collection-points/${id}`,
                {
                    method: "DELETE",
                }
            );

            setSuccess(
                "Ecoponto removido com sucesso."
            );

            await loadPoints();
        } catch (err) {
            console.error(err);
            setError(
                "Não foi possível excluir o ecoponto."
            );
        }
    }

    return (
        <div className="p-8">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Ecopontos
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Gerencie os pontos de coleta do EcoPoint.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                >
                    <Plus size={18} />
                    Novo ecoponto
                </button>

            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                    {success}
                </div>
            )}

            {showForm && (
                <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingId
                                    ? "Editar ecoponto"
                                    : "Novo ecoponto"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Preencha as informações do ponto de coleta.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={closeForm}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-5 md:grid-cols-2"
                    >

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Nome *
                            </label>

                            <input
                                value={form.name}
                                onChange={(e) =>
                                    updateField(
                                        "name",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Estado *
                            </label>

                            <input
                                maxLength={2}
                                value={form.state}
                                onChange={(e) =>
                                    updateField(
                                        "state",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                placeholder="SP"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 uppercase outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Descrição
                            </label>

                            <textarea
                                value={form.description}
                                onChange={(e) =>
                                    updateField(
                                        "description",
                                        e.target.value
                                    )
                                }
                                rows={3}
                                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Endereço *
                            </label>

                            <input
                                value={form.address}
                                onChange={(e) =>
                                    updateField(
                                        "address",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Cidade *
                            </label>

                            <input
                                value={form.city}
                                onChange={(e) =>
                                    updateField(
                                        "city",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Telefone
                            </label>

                            <input
                                value={form.phone}
                                onChange={(e) =>
                                    updateField(
                                        "phone",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                E-mail
                            </label>

                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    updateField(
                                        "email",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Latitude *
                            </label>

                            <input
                                type="number"
                                step="any"
                                value={form.latitude}
                                onChange={(e) =>
                                    updateField(
                                        "latitude",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Longitude *
                            </label>

                            <input
                                type="number"
                                step="any"
                                value={form.longitude}
                                onChange={(e) =>
                                    updateField(
                                        "longitude",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div className="flex justify-end gap-3 md:col-span-2">

                            <button
                                type="button"
                                onClick={closeForm}
                                className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {saving && (
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                )}

                                {editingId
                                    ? "Salvar alterações"
                                    : "Cadastrar ecoponto"}
                            </button>

                        </div>

                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex min-h-40 items-center justify-center">
                    <Loader2
                        className="animate-spin text-emerald-600"
                        size={28}
                    />
                </div>
            ) : points.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">

                    <MapPin
                        size={40}
                        className="mx-auto mb-4 text-slate-300"
                    />

                    <h2 className="text-xl font-bold text-slate-900">
                        Nenhum ecoponto cadastrado
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Cadastre o primeiro ponto de coleta.
                    </p>

                </div>
            ) : (
                <div className="grid gap-5 xl:grid-cols-2">

                    {points.map((point) => (
                        <div
                            key={point.id}
                            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                        >

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <MapPin size={24} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            {point.name}
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {point.address}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            {point.city} - {point.state}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex gap-2">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditForm(point)
                                        }
                                        className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                                        title="Editar"
                                    >
                                        <Edit3 size={18} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(point.id)
                                        }
                                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                                        title="Excluir"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            </div>

                            {point.description && (
                                <p className="mt-5 text-sm text-slate-500">
                                    {point.description}
                                </p>
                            )}

                            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
                                {point.phone && (
                                    <span className="rounded-full bg-slate-50 px-3 py-1">
                                        {point.phone}
                                    </span>
                                )}

                                {point.email && (
                                    <span className="rounded-full bg-slate-50 px-3 py-1">
                                        {point.email}
                                    </span>
                                )}
                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}