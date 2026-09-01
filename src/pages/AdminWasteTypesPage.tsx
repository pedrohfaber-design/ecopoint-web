import { useEffect, useState } from "react";
import {
    Edit3,
    Loader2,
    Plus,
    Recycle,
    Trash2,
    X,
} from "lucide-react";

import { apiFetch } from "@/services/api";

interface WasteType {
    id: string;
    name: string;
    description?: string | null;
}

interface FormData {
    name: string;
    description: string;
}

const emptyForm: FormData = {
    name: "",
    description: "",
};

export default function AdminWasteTypesPage() {
    const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [form, setForm] = useState<FormData>(emptyForm);

    async function loadWasteTypes() {
        try {
            setLoading(true);
            setError("");

            const response = await apiFetch("/api/waste-types");

            setWasteTypes(response.data ?? []);
        } catch (err) {
            console.error(err);
            setError(
                "Não foi possível carregar os tipos de resíduos."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadWasteTypes();
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

    function openEditForm(waste: WasteType) {
        setEditingId(waste.id);

        setForm({
            name: waste.name,
            description: waste.description ?? "",
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

        if (!form.name.trim()) {
            setError("Informe o nome do tipo de resíduo.");
            return;
        }

        try {
            setSaving(true);

            const body = {
                name: form.name.trim(),
                description: form.description.trim() || null,
            };

            if (editingId) {
                await apiFetch(
                    `/api/waste-types/${editingId}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(body),
                    }
                );

                setSuccess(
                    "Tipo de resíduo atualizado com sucesso."
                );
            } else {
                await apiFetch(
                    "/api/waste-types",
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                    }
                );

                setSuccess(
                    "Tipo de resíduo criado com sucesso."
                );
            }

            closeForm();
            await loadWasteTypes();
        } catch (err) {
            console.error(err);
            setError(
                "Não foi possível salvar o tipo de resíduo."
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        const confirmed = window.confirm(
            "Tem certeza que deseja excluir este tipo de resíduo?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await apiFetch(
                `/api/waste-types/${id}`,
                {
                    method: "DELETE",
                }
            );

            setSuccess(
                "Tipo de resíduo removido com sucesso."
            );

            await loadWasteTypes();
        } catch (err) {
            console.error(err);
            setError(
                "Não foi possível excluir o tipo de resíduo."
            );
        }
    }

    return (
        <div className="p-8">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Tipos de Resíduos
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Gerencie os materiais aceitos pelo EcoPoint.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                >
                    <Plus size={18} />
                    Novo tipo
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
                                    ? "Editar tipo de resíduo"
                                    : "Novo tipo de resíduo"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Cadastre as informações do material.
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
                        className="space-y-5"
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
                                placeholder="Ex.: Bateria"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
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
                                placeholder="Descreva o tipo de material."
                                rows={4}
                                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
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
                                    : "Cadastrar tipo"}
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
            ) : wasteTypes.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
                    <Recycle
                        size={40}
                        className="mx-auto mb-4 text-slate-300"
                    />

                    <h2 className="text-xl font-bold text-slate-900">
                        Nenhum tipo cadastrado
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Cadastre o primeiro tipo de resíduo.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {wasteTypes.map((waste) => (
                        <div
                            key={waste.id}
                            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">

                                <div className="flex gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <Recycle size={24} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            {waste.name}
                                        </h2>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {waste.id}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex gap-2">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditForm(waste)
                                        }
                                        className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                                        title="Editar"
                                    >
                                        <Edit3 size={18} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                waste.id
                                            )
                                        }
                                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                                        title="Excluir"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>
                            </div>

                            {waste.description && (
                                <p className="mt-5 text-sm text-slate-500">
                                    {waste.description}
                                </p>
                            )}

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}