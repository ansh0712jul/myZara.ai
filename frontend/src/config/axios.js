import axios from "axios";

// creating instance of axios

const axiosInstance  = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "authorization": `Bearer ${localStorage.getItem('token')}`
    }
});

export default axiosInstance