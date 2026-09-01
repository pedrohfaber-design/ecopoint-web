import { FaRecycle } from "react-icons/fa";

export default function Logo() {
    return (
        <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-emerald-600 p-3 text-white">

                <FaRecycle size={24} />

            </div>

            <div>

                <h1 className="text-2xl font-bold text-slate-900">

                    EcoPoint

                </h1>

                <p className="-mt-1 text-sm text-slate-500">

                    Descarte Inteligente

                </p>

            </div>

        </div>
    );
}