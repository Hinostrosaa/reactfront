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
    const navigate = useNavigate();

    useEffect(() => {
        const loadDetalle = async () => {
            try {
                const res = await getDetalleHistorial(id);
                setRegistro(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar detalle:', error);
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

    if (!registro) {
        return (
            <div className="container mt-4">
                <Card>
                    <Card.Body>
                        <Card.Text>No se encontró el registro solicitado</Card.Text>
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
                            <strong>Paciente:</strong> {registro.paciente?.nombre}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Médico:</strong> {registro.medico?.nombre} ({registro.medico?.especialidad})
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Estado anterior:</strong> 
                            <Badge bg="secondary" className="ms-2">
                                {registro.estado_anterior}
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Estado nuevo:</strong> 
                            <Badge 
                                bg={
                                    registro.estado_nuevo === 'completada' ? 'success' :
                                    registro.estado_nuevo === 'cancelada' ? 'danger' :
                                    'warning'
                                } 
                                className="ms-2"
                            >
                                {registro.estado_actual}
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