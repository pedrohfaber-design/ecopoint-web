import clsx from "clsx";

interface Props {
    active: "login" | "register";
    onChange: (tab: "login" | "register") => void;
}

export default function AuthTabs({
    active,
    onChange,
}: Props) {
    return (
        <div className="mt-10 flex rounded-xl bg-slate-100 p-1">

            <button
                type="button"
                onClick={() => onChange("login")}
                className={clsx(
                    "flex-1 rounded-lg py-3 font-semibold transition-all",
                    active === "login"
                        ? "bg-white text-emerald-600 shadow"
                        : "text-slate-500 hover:text-slate-800"
                )}
            >
                Entrar
            </button>

            <button
                type="button"
                onClick={() => onChange("register")}
                className={clsx(
                    "flex-1 rounded-lg py-3 font-semibold transition-all",
                    active === "register"
                        ? "bg-white text-emerald-600 shadow"
                        : "text-slate-500 hover:text-slate-800"
                )}
            >
                Criar Conta
            </button>

        </div>
    );
}