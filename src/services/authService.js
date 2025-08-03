import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/auth/';

const handleRequest = async (request) => {
    try {
        const response = await request;
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: 'Error de conexión' };
    }
};

export const login = async (username, password) => {
    return handleRequest(axios.post(`${API_BASE_URL}login`, { username, password }));
};

export const requestPasswordReset = async (email) => {
    return handleRequest(axios.post(`${API_BASE_URL}forgot-password`, { email }));
};

export const resetPassword = async (token, newPassword) => {
    return handleRequest(axios.post(`${API_BASE_URL}reset-password`, { token, newPassword }));
};

export const verifyToken = async (token) => {
    return handleRequest(axios.get(`${API_BASE_URL}verify-token`, {
        headers: { Authorization: `Bearer ${token}` }
    }));
};