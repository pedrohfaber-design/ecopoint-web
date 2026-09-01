import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Recycle, Plus, Trash2 } from "lucide-react";

import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface CollectionPoint {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
}

interface WasteType {
    id: string;
    name: string;
    description?: string;
}

interface DisposalItem {
    waste_type_id: string;
    quantity: number;
}

export default function NewDisposalPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [collectionPoints, setCollectionPoints] = useState<
        CollectionPoint[]
    >([]);

    const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);

    const [collectionPointId, setCollectionPointId] = useState("");

    const [wasteTypeId, setWasteTypeId] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [items, setItems] = useState<DisposalItem[]>([]);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const [pointsResponse, wasteResponse] =
                    await Promise.all([
                        apiFetch("/api/collection-points"),
                        apiFetch("/api/waste-types"),
                    ]);

                setCollectionPoints(pointsResponse.data);
                setWasteTypes(wasteResponse.data);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);

                setError(
                    "Não foi possível carregar os ecopontos e tipos de resíduos."
                );
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    function addItem() {
        setError("");
        setSuccess("");

        if (!wasteTypeId) {
            setError("Selecione um tipo de resíduo.");
            return;
        }

        if (quantity <= 0) {
            setError("A quantidade deve ser maior que zero.");
            return;
        }

        const existingItem = items.find(
            (item) => item.waste_type_id === wasteTypeId
        );

        if (existingItem) {
            setItems(
                items.map((item) =>
                    item.waste_type_id === wasteTypeId
                        ? {
                              ...item,
                              quantity: item.quantity + quantity,
                          }
                        : item
                )
            );
        } else {
            setItems([
                ...items,
                {
                    waste_type_id: wasteTypeId,
                    quantity,
                },
            ]);
        }

        setWasteTypeId("");
        setQuantity(1);
    }

    function removeItem(wasteTypeId: string) {
        setItems(
            items.filter(
                (item) => item.waste_type_id !== wasteTypeId
            )
        );
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!user?.id) {
            setError("Usuário não autenticado.");
            return;
        }

        if (!collectionPointId) {
            setError("Selecione um ecoponto.");
            return;
        }

        if (items.length === 0) {
            setError("Adicione pelo menos um tipo de resíduo.");
            return;
        }

        try {
            setSubmitting(true);

            await apiFetch("/api/disposal-requests", {
                method: "POST",
                body: JSON.stringify({
                    user_id: user.id,
                    collection_point_id: collectionPointId,
                    items,
                }),
            });

            setSuccess(
                "Solicitação de descarte criada com sucesso!"
            );

            setItems([]);
            setCollectionPointId("");
        } catch (err) {
            console.error(
                "Erro ao criar solicitação:",
                err
            );

            setError(
                "Não foi possível criar a solicitação."
            );
        } finally {
            setSubmitting(false);
        }
    }

    function getWasteName(id: string) {
        return (
            wasteTypes.find((waste) => waste.id === id)?.name ??
            "Resíduo"
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-slate-500">
                    Carregando informações...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">

            <div className="mx-auto max-w-5xl">

                {/* Cabeçalho */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Novo descarte
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Informe o local e os resíduos que deseja
                        encaminhar.
                    </p>

                </div>

                {/* Mensagens */}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-600">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Ecoponto */}

                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">

                            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                <MapPin size={22} />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Escolha o ecoponto
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Selecione onde deseja realizar
                                    o descarte.
                                </p>
                            </div>

                        </div>

                        <select
                            value={collectionPointId}
                            onChange={(event) =>
                                setCollectionPointId(
                                    event.target.value
                                )
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        >

                            <option value="">
                                Selecione um ecoponto
                            </option>

                            {collectionPoints.map((point) => (
                                <option
                                    key={point.id}
                                    value={point.id}
                                >
                                    {point.name} — {point.city}/
                                    {point.state}
                                </option>
                            ))}

                        </select>

                    </div>

                    {/* Resíduos */}

                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">

                            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                <Recycle size={22} />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Resíduos
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Adicione os materiais que serão
                                    descartados.
                                </p>
                            </div>

                        </div>

                        <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">

                            <select
                                value={wasteTypeId}
                                onChange={(event) =>
                                    setWasteTypeId(
                                        event.target.value
                                    )
                                }
                                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            >

                                <option value="">
                                    Selecione o resíduo
                                </option>

                                {wasteTypes.map((waste) => (
                                    <option
                                        key={waste.id}
                                        value={waste.id}
                                    >
                                        {waste.name}
                                    </option>
                                ))}

                            </select>

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(event) =>
                                    setQuantity(
                                        Number(event.target.value)
                                    )
                                }
                                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />

                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                            >
                                <Plus size={18} />
                                Adicionar
                            </button>

                        </div>

                        {/* Lista */}

                        {items.length > 0 && (
                            <div className="mt-6 space-y-3">

                                {items.map((item) => (
                                    <div
                                        key={item.waste_type_id}
                                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
                                    >

                                        <div>

                                            <p className="font-semibold text-slate-800">
                                                {getWasteName(
                                                    item.waste_type_id
                                                )}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                Quantidade:{" "}
                                                {item.quantity}
                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeItem(
                                                    item.waste_type_id
                                                )
                                            }
                                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                    {/* Enviar */}

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting
                                ? "Enviando..."
                                : "Solicitar descarte"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}