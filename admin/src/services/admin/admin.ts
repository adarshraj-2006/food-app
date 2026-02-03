import { api } from "../../lib/api/api";

export const addFood = async (data: FormData) => {
    // Axios will automatically set the correct Content-Type with boundary for FormData
    const response = await api.post("/api/food/add", data);
    return response.data;
};

export const listFood = async () => {
    const response = await api.get("/api/food/list");
    return response.data;
};

export const removeFood = async (id: string) => {
    const response = await api.post("/api/food/remove", { id });
    return response.data;
};


export const listOrders = async () => {
    const response = await api.get("/api/order/list");
    return response.data;
};

export const updateStatus = async (orderId: string, status: string) => {
    const response = await api.post("/api/order/status", { orderId, status });
    return response.data;
};

export const listUsers = async () => {
    const response = await api.get("/api/user/list");
    return response.data;
};

export const loginAdmin = async (data: any) => {
    const response = await api.post("/api/user/login", data);
    return response.data;
};

export const getStats = async () => {
    const response = await api.get("/api/stats");
    return response.data;
};
