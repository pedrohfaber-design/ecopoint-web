import { apiFetch } from "./api";

export async function login(data: {
    email: string;
    password: string;
}) {
    return await apiFetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function register(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    state: string;
}) {
    return await apiFetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}