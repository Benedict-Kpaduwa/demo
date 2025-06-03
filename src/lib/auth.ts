// src/lib/auth.ts
import axios from 'axios';

export const login = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post('/api/auth/login', credentials, {
            withCredentials: true,
        });
        return response.data.message;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const register = async (credentials: { name: string; email: string; password: string; confirmPassword: string }) => {
    try {
        const response = await axios.post('/api/auth/register', credentials, {
            withCredentials: true,
        });
        return response.data.message;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
};