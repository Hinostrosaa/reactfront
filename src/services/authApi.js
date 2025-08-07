import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/auth/';

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error.response?.data || { 
            success: false, 
            message: 'Error al iniciar sesión' 
        };
    }
};

export const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}check-auth`);
        return response.data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error.response?.data || { 
            success: false, 
            message: 'Error al verificar autenticación' 
        };
    }
};