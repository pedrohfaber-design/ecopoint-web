import { motion } from "framer-motion";

import {
    MapPin,
    CalendarDays,
    ShieldCheck,
    History,
    Earth,
    Zap,
} from "lucide-react";

const benefits = [
    {
        icon: MapPin,
        title: "Ecopontos próximos",
        description:
            "Localize rapidamente pontos de coleta próximos da sua localização.",
    },
    {
        icon: CalendarDays,
        title: "Agendamento fácil",
        description:
            "Solicite retiradas sem complicação diretamente pela plataforma.",
    },
    {
        icon: Earth,
        title: "Impacto ambiental",
        description:
            "Cada descarte correto ajuda na preservação do meio ambiente.",
    },
    {
        icon: History,
        title: "Histórico completo",
        description:
            "Acompanhe todos os seus descartes realizados ao longo do tempo.",
    },
    {
        icon: ShieldCheck,
        title: "Dados protegidos",
        description:
            "Suas informações são armazenadas com segurança.",
    },
    {
        icon: Zap,
        title: "Experiência rápida",
        description:
            "Interface moderna e otimizada para qualquer dispositivo.",
    },
];

export default function BenefitsSection() {
    return (
        <section className="bg-slate-100 py-32">

            <div className="mx-auto max-w-7xl px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <span className="font-semibold uppercase tracking-widest text-emerald-600">
                        Benefícios
                    </span>

                    <h2 className="mt-4 text-5xl font-bold text-slate-900">
                        Por que utilizar o EcoPoint?
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-500">
                        Desenvolvemos uma plataforma simples, rápida e inteligente
                        para tornar o descarte eletrônico muito mais fácil.
                    </p>

                </motion.div>

                <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {benefits.map((benefit, index) => {

                        const Icon = benefit.icon;

                        return (

                            <motion.div
                                key={benefit.title}
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: index * 0.08,
                                }}
                                className="rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

                                    <Icon
                                        size={30}
                                        className="text-emerald-600"
                                    />

                                </div>

                                <h3 className="text-2xl font-bold text-slate-900">
                                    {benefit.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-500">
                                    {benefit.description}
                                </p>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}