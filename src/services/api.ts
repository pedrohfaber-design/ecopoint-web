const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token = localStorage.getItem("token");

    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            error || `Erro HTTP ${response.status}`
        );
    }

    return response.json();
}