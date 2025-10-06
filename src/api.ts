import axios from "axios";
import { queryClient } from "./queryClient";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            queryClient.clear()
            localStorage.clear()
        }
        return Promise.reject(error)
    }
)
export default api