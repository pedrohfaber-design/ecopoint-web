import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
    className,
    ...props
}: InputProps) {
    return (
        <input
            {...props}
            className={clsx(
                "w-full rounded-xl border border-slate-300 bg-white px-4 py-3",
                "outline-none transition-all duration-300",
                "focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100",
                className,
            )}
        />
    );
}