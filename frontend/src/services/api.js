import axios from "axios";
import { pegarToken } from "./auth";

const api = axios.create({
    baseURL: "https://block-crm.onrender.com"
});

api.interceptors.request.use((config) => {

    const token = pegarToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export default api;