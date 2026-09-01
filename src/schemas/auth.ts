import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Informe um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;


export const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, "Informe seu nome completo"),

        email: z
            .email("Informe um e-mail válido"),

        password: z
            .string()
            .min(6, "A senha deve ter pelo menos 6 caracteres"),

        confirmPassword: z
            .string()
            .min(1, "Confirme sua senha"),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "As senhas não coincidem",
            path: ["confirmPassword"],
        }
    );

export type RegisterFormData = z.infer<typeof registerSchema>;