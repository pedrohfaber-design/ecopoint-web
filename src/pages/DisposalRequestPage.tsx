import { useEffect, useState } from "react";
import {
    MapPin,
    Recycle,
    Plus,
    Minus,
    Send,
    Loader2,
    CheckCircle2,
} from "lucide-react";

import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface CollectionPoint {
    id: string;
    name: string;
    description: string;
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

export default function DisposalRequestPage() {
    const { user } = useAuth();

    const [collectionPoints, setCollectionPoints] = useState<
        CollectionPoint[]
    >([]);

    const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);

    const [collectionPointId, setCollectionPointId] = useState("");

    const [items, setItems] = useState<DisposalItem[]>([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const [pointsResponse, wasteResponse] = await Promise.all([
                    apiFetch("/api/collection-points"),
                    apiFetch("/api/waste-types"),
                ]);

                console.log("Ecopontos:", pointsResponse);
                console.log("Tipos de resíduos:", wasteResponse);

                setCollectionPoints(pointsResponse.data ?? []);
                setWasteTypes(wasteResponse.data ?? []);
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

    function addWasteType(wasteTypeId: string) {
        setItems((current) => {
            const existing = current.find(
                (item) => item.waste_type_id === wasteTypeId
            );

            if (existing) {
                return current.map((item) =>
                    item.waste_type_id === wasteTypeId
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                );
            }

            return [
                ...current,
                {
                    waste_type_id: wasteTypeId,
                    quantity: 1,
                },
            ];
        });
    }

    function removeWasteType(wasteTypeId: string) {
        setItems((current) =>
            current
                .map((item) =>
                    item.waste_type_id === wasteTypeId
                        ? {
                              ...item,
                              quantity: item.quantity - 1,
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function getQuantity(wasteTypeId: string) {
        return (
            items.find((item) => item.waste_type_id === wasteTypeId)
                ?.quantity ?? 0
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!user?.id) {
            setError("Usuário não identificado.");
            return;
        }

        if (!collectionPointId) {
            setError("Selecione um ecoponto.");
            return;
        }

        if (items.length === 0) {
            setError("Selecione pelo menos um tipo de resíduo.");
            return;
        }

        try {
            setSubmitting(true);

            const body = {
                user_id: user.id,
                collection_point_id: collectionPointId,
                items,
            };

            console.log("Enviando solicitação:", body);

            await apiFetch("/api/disposal-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            setSuccess(
                "Solicitação de descarte criada com sucesso!"
            );

            setCollectionPointId("");
            setItems([]);
        } catch (err) {
            console.error("Erro ao criar solicitação:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível criar a solicitação."
            );
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex items-center gap-3 text-slate-500">
                    <Loader2
                        size={22}
                        className="animate-spin"
                    />

                    <span>Carregando dados...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mx-auto max-w-6xl">
                {/* Cabeçalho */}

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Solicitar descarte
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Informe onde deseja realizar o descarte e quais
                        resíduos serão encaminhados.
                    </p>
                </div>

                {/* Mensagens */}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                        <CheckCircle2 size={20} />

                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Ecopontos */}

                        <div className="lg:col-span-1">
                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <MapPin size={22} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            Ecoponto
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Onde será realizado o descarte?
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {collectionPoints.length === 0 ? (
                                        <p className="text-sm text-slate-400">
                                            Nenhum ecoponto disponível.
                                        </p>
                                    ) : (
                                        collectionPoints.map((point) => {
                                            const selected =
                                                collectionPointId ===
                                                point.id;

                                            return (
                                                <button
                                                    key={point.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setCollectionPointId(
                                                            point.id
                                                        )
                                                    }
                                                    className={`w-full rounded-xl border p-4 text-left transition ${
                                                        selected
                                                            ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                                                            : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <MapPin
                                                            size={20}
                                                            className={
                                                                selected
                                                                    ? "mt-0.5 text-emerald-600"
                                                                    : "mt-0.5 text-slate-400"
                                                            }
                                                        />

                                                        <div>
                                                            <p className="font-semibold text-slate-900">
                                                                {point.name}
                                                            </p>

                                                            <p className="mt-1 text-sm text-slate-500">
                                                                {
                                                                    point.address
                                                                }
                                                            </p>

                                                            <p className="text-sm text-slate-500">
                                                                {point.city} -{" "}
                                                                {point.state}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Resíduos */}

                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <Recycle size={22} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            Resíduos
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Informe os resíduos que deseja
                                            descartar.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {wasteTypes.length === 0 ? (
                                        <p className="text-sm text-slate-400">
                                            Nenhum tipo de resíduo cadastrado.
                                        </p>
                                    ) : (
                                        wasteTypes.map((waste) => {
                                            const quantity = getQuantity(
                                                waste.id
                                            );

                                            return (
                                                <div
                                                    key={waste.id}
                                                    className="rounded-xl border border-slate-200 p-5"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <h3 className="font-semibold text-slate-900">
                                                                {waste.name}
                                                            </h3>

                                                            {waste.description && (
                                                                <p className="mt-1 text-sm text-slate-500">
                                                                    {
                                                                        waste.description
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeWasteType(
                                                                        waste.id
                                                                    )
                                                                }
                                                                disabled={
                                                                    quantity ===
                                                                    0
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                                                            >
                                                                <Minus
                                                                    size={16}
                                                                />
                                                            </button>

                                                            <span className="w-8 text-center font-bold text-slate-900">
                                                                {quantity}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    addWasteType(
                                                                        waste.id
                                                                    )
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700"
                                                            >
                                                                <Plus
                                                                    size={16}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                {/* Resumo */}

                                <div className="mt-8 rounded-xl bg-slate-50 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                Resumo
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {items.length} tipo(s) de
                                                resíduo selecionado(s)
                                            </p>
                                        </div>

                                        <p className="text-lg font-bold text-emerald-600">
                                            {items.reduce(
                                                (total, item) =>
                                                    total + item.quantity,
                                                0
                                            )}{" "}
                                            item(s)
                                        </p>
                                    </div>
                                </div>

                                {/* Botão */}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2
                                                size={20}
                                                className="animate-spin"
                                            />

                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />

                                            Solicitar descarte
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}