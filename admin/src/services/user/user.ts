import { api } from "../../lib/api/api";

export const listUsers = async () => {
    const response = await api.get("/api/user/list");
    return response.data;
};

// Add other user-related services here as needed
