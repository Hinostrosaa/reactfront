import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/auth/';

// Configuración global de axios
axios.defaults.withCredentials = true;

const handleRequest = async (request) => {
    try {
        const response = await request;
        
        if (!response.data) {
            throw new Error('No se recibió respuesta del servidor');
        }
        
        if (response.data.success === false) {
            throw new Error(response.data.message || 'Error de autenticación');
        }
        
        return response.data;
        
    } catch (error) {
        console.error('Detalle completo del error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        
        const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Error de conexión con el servidor';
        
        throw new Error(errorMessage);
    }
};

export const login = async (username, password) => {
    return handleRequest(
        axios.post(`${API_BASE_URL}login`, 
            { username, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        )
    );
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