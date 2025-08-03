import React, { useState } from 'react';
import { requestPasswordReset } from '../../services/authService';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (!email) {
                throw new Error('El correo electrónico es requerido');
            }

            const response = await requestPasswordReset(email);
            
            if (response.success) {
                setSuccess(response.message);
            } else {
                throw new Error(response.error || 'Error al procesar la solicitud');
            }
        } catch (err) {
            setError(err.message || 'Error al enviar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2 className="text-center mb-4">Recuperar Contraseña</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">
                        Te enviaremos un enlace para restablecer tu contraseña.
                    </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? (
                            <Spinner animation="border" size="sm" />
                        ) : 'Enviar Instrucciones'}
                    </Button>
                </div>
            </Form>

            <div className="mt-3 text-center">
                <a href="/login" className="text-decoration-none">
                    Volver al inicio de sesión
                </a>
            </div>
        </div>
    );
};

export default ForgotPassword;