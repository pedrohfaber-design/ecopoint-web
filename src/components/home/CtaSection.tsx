import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
    return (
        <section className="relative overflow-hidden py-32">

            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600" />

            <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <motion.div
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
                className="relative mx-auto flex max-w-5xl flex-col items-center px-8 text-center"
            >

                <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
                    ♻️ Faça parte da mudança
                </span>

                <h2 className="mt-8 text-5xl font-bold leading-tight text-white">

                    Pronto para transformar
                    <br />

                    o futuro do planeta?

                </h2>

                <p className="mt-8 max-w-3xl text-xl leading-9 text-emerald-50">

                    Cadastre-se gratuitamente e encontre pontos de coleta,
                    acompanhe descartes e contribua para um mundo mais sustentável.

                </p>

                <button
                    className="
                    mt-12
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-white
                    px-10
                    py-5
                    text-lg
                    font-semibold
                    text-emerald-700
                    shadow-2xl
                    transition
                    duration-300
                    hover:scale-105
                "
                >

                    Criar conta gratuitamente

                    <ArrowRight size={22} />

                </button>

            </motion.div>

        </section>
    );
}