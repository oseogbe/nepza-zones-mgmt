import { reactive } from "vue";
import axios from "axios";

const state = reactive({
    error: null,
    loading: false,
    data: null,
});

const instance = axios.create({
    baseURL: "http://nepza.online:8000/api/z1.0",
    withCredentials: true,
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("nz-token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = 'application/json';
    return config;
});

export default function useAxios() {
    async function request(method, url, data = null) {
        state.loading = true;
        try {
            const response = await instance({
                method,
                url,
                data,
            });
            state.data = response.data;
        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    return {
        state,
        request,
    };
}
