import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;