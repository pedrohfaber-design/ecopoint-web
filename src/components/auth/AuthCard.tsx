import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function AuthCard({
    children,
}: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.5,
            }}
            className="
                w-full
                max-w-md
                rounded-3xl
                bg-white
                p-10
                shadow-2xl
            "
        >
            {children}
        </motion.div>
    );
}