import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

export default function Card({
    children,
}: CardProps) {
    return (
        <div
            className="
                rounded-3xl
                bg-white
                p-10
                shadow-2xl
                backdrop-blur-xl
            "
        >
            {children}
        </div>
    );
}