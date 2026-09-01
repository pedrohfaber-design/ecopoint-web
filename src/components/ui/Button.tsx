import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
}

export default function Button({
    children,
    className,
    variant = "primary",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={clsx(
                "rounded-xl px-6 py-3 font-semibold transition-all duration-300",
                "disabled:cursor-not-allowed disabled:opacity-50",

                {
                    "bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-1":
                        variant === "primary",

                    "bg-slate-900 text-white hover:bg-slate-800":
                        variant === "secondary",

                    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100":
                        variant === "outline",
                },

                className,
            )}
        >
            {children}
        </button>
    );
}