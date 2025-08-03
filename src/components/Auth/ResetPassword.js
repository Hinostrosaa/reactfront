import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (!tokenParam) {
            navigate('/forgot-password');
        }
        setToken(tokenParam);
    }, [searchParams, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (!newPassword || !confirmPassword) {
                throw new Error('Ambos campos son requeridos');
            }

            if (newPassword.length < 9) {
                throw new Error('La contraseña debe tener al menos 9 caracteres');
            }

            if (newPassword !== confirmPassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            const response = await resetPassword(token, newPassword);
            
            if (response.success) {
                setSuccess(response.message);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                throw new Error(response.error || 'Error al restablecer la contraseña');
            }
        } catch (err) {
            setError(err.message || 'Error al restablecer la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <h2 className="text-center mb-4">Restablecer Contraseña</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nueva Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength="9"
                    />
                    <Form.Text className="text-muted">
                        Mínimo 9 caracteres.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength="9"
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
                        ) : 'Restablecer Contraseña'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ResetPassword;