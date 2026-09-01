import { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

import { apiFetch } from "@/services/api";

interface CollectionPoint {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    phone?: string | null;
    email?: string | null;
}

export default function CollectionPointsPage() {
    const [points, setPoints] = useState<CollectionPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPoints() {
            try {
                const response = await apiFetch(
                    "/api/collection-points"
                );

                setPoints(response.data ?? []);
            } catch (err) {
                console.error(err);
                setError(
                    "Não foi possível carregar os ecopontos."
                );
            } finally {
                setLoading(false);
            }
        }

        loadPoints();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2
                    size={28}
                    className="animate-spin text-emerald-600"
                />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Ecopontos
                </h1>

                <p className="mt-2 text-slate-500">
                    Encontre os pontos de coleta disponíveis.
                </p>
            </div>

            {error && (
                <div className="rounded-xl bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            {!error && points.length === 0 && (
                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                    <MapPin
                        className="mx-auto mb-4 text-slate-300"
                        size={40}
                    />

                    <p className="text-slate-500">
                        Nenhum ecoponto cadastrado.
                    </p>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {points.map((point) => (
                    <div
                        key={point.id}
                        className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                    >
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <MapPin size={24} />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    {point.name}
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    {point.address}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {point.city} - {point.state}
                                </p>

                                {point.description && (
                                    <p className="mt-3 text-sm text-slate-500">
                                        {point.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}