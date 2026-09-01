import { Mail, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    function scrollToSection(id: string) {
        if (location.pathname === "/") {
            const section = document.getElementById(id);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }

            return;
        }

        navigate(`/#${id}`);
    }

    function scrollToTop() {
        if (location.pathname === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        navigate("/");
    }

    return (
        <footer className="bg-slate-950 text-slate-300">
            <div className="mx-auto max-w-7xl px-8 py-20">
                <div className="grid gap-12 lg:grid-cols-4">
                    {/* Logo */}
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            <span className="text-emerald-500">Eco</span>
                            Point
                        </h2>

                        <p className="mt-6 leading-8 text-slate-400">
                            Plataforma inteligente para descarte correto de
                            resíduos eletrônicos, promovendo sustentabilidade
                            e preservação ambiental.
                        </p>
                    </div>

                    {/* Navegação */}
                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-white">
                            Navegação
                        </h3>

                        <ul className="space-y-4">
                            <li>
                                <button
                                    type="button"
                                    onClick={scrollToTop}
                                    className="transition hover:text-emerald-400"
                                >
                                    Início
                                </button>
                            </li>

                            <li>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection("ecopontos")}
                                    className="transition hover:text-emerald-400"
                                >
                                    Ecopontos
                                </button>
                            </li>

                            <li>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection("como-funciona")}
                                    className="transition hover:text-emerald-400"
                                >
                                    Como funciona
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-white">
                            Contato
                        </h3>

                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <Mail size={18} />
                                <a
                                    href="mailto:sistemyecopoint@gmail.com"
                                    className="transition hover:text-emerald-400"
                                >
                                    sistemyecopoint@gmail.com
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                São Paulo - SP
                            </div>
                        </div>
                    </div>

                    {/* Redes sociais */}
                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-white">
                            Redes sociais
                        </h3>

                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/faberzx/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-emerald-600 hover:text-white"
                            >
                                <FaInstagram size={18} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/pedro-faber-a52a25252"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-emerald-600 hover:text-white"
                            >
                                <FaLinkedin size={18} />
                            </a>

                            <a
                                href="https://github.com/pedrohfaber-design"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-emerald-600 hover:text-white"
                            >
                                <FaGithub size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} EcoPoint • Desenvolvido por Pedro Henrique Faber.
                </div>
            </div>
        </footer>
    );
}