import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetalleHistorial } from '../services/api';
import { Card, ListGroup, Badge, Spinner, Button, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
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
                const response = await getDetalleHistorial(id);
                
                console.log('Respuesta completa del backend:', response); // Para depuración
                
                // Manejar tanto el formato antiguo como el nuevo del backend
                const data = response.data || response;
                
                if (!data) {
                    throw new Error('No se recibieron datos del servidor');
                }

                // Verificar si la respuesta tiene el formato esperado
                if (data.success === false) {
                    throw new Error(data.message || 'Error en el servidor');
                }

                // Extraer los datos independientemente del formato
                const registroData = data.data || data;
                
                if (!registroData) {
                    throw new Error('Estructura de datos incorrecta');
                }

                setRegistro(registroData);
            } catch (error) {
                console.error('Error al cargar detalle:', error);
                setError(error.message || 'Error al cargar los detalles');
            } finally {
                setLoading(false);
            }
        };
        
        loadDetalle();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleString();
        } catch {
            return 'Fecha inválida';
        }
    };

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
                <Alert variant="danger">
                    <Alert.Heading><FaExclamationTriangle /> Error</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="primary" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Volver al historial
                    </Button>
                </Alert>
            </div>
        );
    }

    if (!registro) {
        return (
            <div className="container mt-4">
                <Alert variant="warning">
                    <Alert.Heading>Registro no encontrado</Alert.Heading>
                    <p>No se pudo encontrar el registro solicitado</p>
                    <Button variant="primary" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Volver al historial
                    </Button>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3">
                <FaArrowLeft /> Volver al historial
            </Button>

            <Card>
                <Card.Header className="bg-primary text-white">
                    <h4>Detalles del registro #{registro.id_historial || 'N/A'}</h4>
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
                            {registro.paciente?.nombre || registro.nombre_paciente || registro.id_paciente || 'N/A'}
                            {registro.paciente?.dni && ` (DNI: ${registro.paciente.dni})`}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Médico:</strong> 
                            {registro.medico?.nombre 
                                ? `${registro.medico.nombre} (${registro.medico.especialidad || 'Sin especialidad'})`
                                : registro.nombre_medico || registro.id_medico || 'N/A'}
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
                        <ListGroup.Item>
                            <strong>Motivo del cambio:</strong> 
                            {registro.motivo_cambio || 'No especificado'}
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