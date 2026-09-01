import { motion } from "framer-motion";
import { FaRecycle } from "react-icons/fa";

import StatsSection from "@/components/home/StatsSection";
import HowItWorks from "@/components/home/HowItWorks";
import MapSection from "@/components/home/MapSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {

    function scrollToSection(id: string) {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    return (
        <>

            {/* HERO */}

            <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50 to-white">

                <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-between px-4 pt 10">

                    <div className="max-w-2xl">

                        <span className="rounded-full bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-700">
                            🌱 Plataforma Inteligente
                        </span>

                        <h1 className="mt-8 text-6xl font-bold leading-tight text-slate-900">
                    

                            Transformando

                            <br />

                            <span className="text-emerald-600">
                                lixo eletrônico
                            </span>

                            <br />

                            em sustentabilidade.

                        </h1>

                        <p className="mt-8 text-xl leading-9 text-slate-500">
                            Encontre pontos de coleta, acompanhe descartes,
                            solicite retiradas e ajude o planeta.
                        </p>

                        <div className="mt-12 flex gap-5">

                            <button
                                type="button"
                                onClick={() =>
                                    scrollToSection("ecopontos")
                                }
                                className="rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-700"
                            >
                                Encontrar Ecopontos
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    scrollToSection("como-funciona")
                                }
                                className="rounded-xl border border-slate-300 px-8 py-4 text-lg transition hover:bg-slate-100"
                            >
                                Como funciona
                            </button>

                        </div>

                    </div>

                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                        className="hidden lg:block"
                    >

                        <div className="flex h-96 w-96 items-center justify-center rounded-full bg-emerald-500 shadow-2xl">

                            <FaRecycle
                                className="text-white"
                                size={180}
                            />

                        </div>

                    </motion.div>

                </div>

            </section>


            {/* COMO FUNCIONA */}

            <div
                id="como-funciona"
                className="scroll-mt-24"
            >
                <HowItWorks />
            </div>


            {/* CATEGORIAS */}

            <CategoriesSection />


            {/* ESTATÍSTICAS */}

            <StatsSection />


            {/* ECOPONTOS */}

            <div
                id="ecopontos"
                className="scroll-mt-24"
            >
                <MapSection />
            </div>


            {/* BENEFÍCIOS */}

            <BenefitsSection />


            {/* CTA */}

            <CtaSection />


            {/* CONTATO */}

            <div
                id="contato"
                className="scroll-mt-24"
            >
                <Footer />
            </div>

        </>
    );
}