import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../styles/Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { username, password } = formData;
            
            if (!username || !password) {
                throw new Error('Nombre de usuario y contraseña son requeridos');
            }

            const response = await loginService(username, password);
            
            if (response.success) {
                login(response.token, response.user);
                navigate('/');
            } else {
                throw new Error(response.error || 'Credenciales inválidas');
            }
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? (
                                <Spinner animation="border" size="sm" />
                            ) : 'Iniciar Sesión'}
                        </Button>
                    </div>

                    <div className="mt-3 text-center">
                        <a href="/forgot-password" className="text-decoration-none">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;