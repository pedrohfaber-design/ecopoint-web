import { motion } from "framer-motion";

import {
    Laptop,
    Smartphone,
    Monitor,
    BatteryCharging,
    Tv,
    Cable,
} from "lucide-react";

const categories = [
    {
        title: "Notebooks",
        icon: Laptop,
        color: "from-emerald-500 to-green-400",
    },
    {
        title: "Celulares",
        icon: Smartphone,
        color: "from-sky-500 to-cyan-400",
    },
    {
        title: "Monitores",
        icon: Monitor,
        color: "from-indigo-500 to-violet-500",
    },
    {
        title: "Baterias",
        icon: BatteryCharging,
        color: "from-orange-500 to-yellow-400",
    },
    {
        title: "Televisores",
        icon: Tv,
        color: "from-red-500 to-pink-500",
    },
    {
        title: "Cabos",
        icon: Cable,
        color: "from-slate-700 to-slate-500",
    },
];

export default function CategoriesSection() {
    return (
        <section className="bg-white py-32">

            <div className="mx-auto max-w-7xl px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <span className="font-semibold uppercase tracking-widest text-emerald-600">
                        Categorias
                    </span>

                    <h2 className="mt-4 text-5xl font-bold text-slate-900">
                        O que você pode descartar?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
                        Aceitamos diversos tipos de equipamentos eletrônicos para
                        reciclagem responsável.
                    </p>

                </motion.div>

                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {categories.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <motion.div
                                key={item.title}
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
                                    delay: index * 0.1,
                                }}
                                className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >

                                <div
                                    className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-lg transition duration-300 group-hover:scale-110`}
                                >

                                    <Icon size={40} />

                                </div>

                                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-slate-500">
                                    Descarte de forma correta e sustentável.
                                </p>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}