import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetalleHistorial } from '../services/api';
import { Card, ListGroup, Badge, Spinner, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DetalleHistorialPage = () => {
    const { id } = useParams();
    const [registro, setRegistro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDetalle = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await getDetalleHistorial(id);
                
                // Verificar estructura de la respuesta
                if (!res.data) {
                    throw new Error('No se recibieron datos del servidor');
                }
                
                // Asegurar que tenemos los datos necesarios
                if (!res.data.paciente || !res.data.medico) {
                    console.warn('Datos incompletos en la respuesta:', res.data);
                }
                
                setRegistro(res.data);
            } catch (error) {
                console.error('Error al cargar detalle:', error);
                setError(error.message || 'Error al cargar los detalles');
            } finally {
                setLoading(false);
            }
        };
        loadDetalle();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p>Cargando detalles del registro...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <Card>
                    <Card.Body>
                        <Card.Text className="text-danger">{error}</Card.Text>
                        <Button variant="primary" onClick={() => navigate(-1)}>
                            Volver
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    if (!registro) {
        return (
            <div className="container mt-4">
                <Card>
                    <Card.Body>
                        <Card.Text>No se encontró el registro solicitado</Card.Text>
                        <Button variant="primary" onClick={() => navigate(-1)}>
                            Volver
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    // Función para formatear fechas de manera segura
    const formatDate = (dateString) => {
        try {
            return dateString ? new Date(dateString).toLocaleString() : 'N/A';
        } catch {
            return 'Fecha inválida';
        }
    };

    return (
        <div className="container mt-4">
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3">
                <FaArrowLeft /> Volver al historial
            </Button>

            <Card>
                <Card.Header>
                    <h4>Detalles de la cita</h4>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>Fecha original:</strong> {formatDate(registro.fecha_original)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Fecha modificación:</strong> {formatDate(registro.fecha_cambio)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <strong>Paciente:</strong> 
                            {registro.paciente?.nombre || registro.id_paciente || 'N/A'}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Médico:</strong> 
                            {registro.medico?.nombre ? `${registro.medico.nombre} (${registro.medico.especialidad || 'Sin especialidad'})` 
                             : registro.id_medico || 'N/A'}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Estado anterior:</strong> 
                            <Badge bg="secondary" className="ms-2">
                                {registro.estado_anterior || 'N/A'}
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Estado actual:</strong> 
                            <Badge 
                                bg={
                                    registro.estado_actual === 'completada' ? 'success' :
                                    registro.estado_actual === 'cancelada' ? 'danger' :
                                    'warning'
                                } 
                                className="ms-2"
                            >
                                {registro.estado_actual || 'N/A'}
                            </Badge>
                        </ListGroup.Item>
                        {registro.observaciones && (
                            <ListGroup.Item>
                                <strong>Observaciones:</strong> {registro.observaciones}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default DetalleHistorialPage;