import axios from "axios";


const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000").replace(/\/$/, "");


export const url = BASE_URL;
export const imageUrl = `${BASE_URL}/images`;

export const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.token = token;
    }
    return config;
});