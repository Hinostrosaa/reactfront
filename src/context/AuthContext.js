import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../services/authService';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Definir logout con useCallback para evitar recreación en cada render
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    }, [navigate]);

    // Definir login
    const login = useCallback((token, userData) => {
        localStorage.setItem('token', token);
        setUser(userData);
        setIsAuthenticated(true);
        navigate('/');
    }, [navigate]);

    // Efecto para verificar autenticación al cargar
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await verifyToken(token);
                    if (response.success) {
                        setUser(response.user);
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [logout]);

    // Valor del contexto
    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};