import axios from "axios";


export const url = "http://localhost:4000";
export const imageUrl = "http://localhost:4000/images";

export const api = axios.create({
    baseURL: "http://localhost:4000",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.token = token;
    }
    return config;
});