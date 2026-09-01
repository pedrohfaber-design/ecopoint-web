import { motion } from "framer-motion";
import {
    Search,
    MapPin,
    Recycle,
} from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Encontre",
        description:
            "Pesquise rapidamente o ponto de coleta mais próximo da sua localização.",
    },
    {
        icon: MapPin,
        title: "Leve seu eletrônico",
        description:
            "Dirija-se ao ecoponto escolhido e descarte seus resíduos com segurança.",
    },
    {
        icon: Recycle,
        title: "Ajude o planeta",
        description:
            "Seu descarte correto reduz impactos ambientais e incentiva a reciclagem.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-white py-28">

            <div className="mx-auto max-w-7xl px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <span className="font-semibold uppercase tracking-widest text-emerald-600">
                        Como funciona
                    </span>

                    <h2 className="mt-4 text-5xl font-bold text-slate-900">
                        Descartar nunca foi tão simples
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
                        Em apenas três passos você contribui para um futuro mais sustentável.
                    </p>

                </motion.div>

                <div className="mt-20 grid gap-10 md:grid-cols-3">

                    {steps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <motion.div
                                key={step.title}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: index * 0.2,
                                }}
                                className="group rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition group-hover:scale-110">

                                    <Icon size={30} />

                                </div>

                                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                                    {step.title}
                                </h3>

                                <p className="mt-4 leading-8 text-slate-500">
                                    {step.description}
                                </p>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}