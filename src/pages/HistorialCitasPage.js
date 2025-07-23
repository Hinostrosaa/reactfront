import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHistorialCitas } from '../services/api';
import { Table, Form, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const HistorialCitasPage = ({ specificCitaId }) => {
    const [historial, setHistorial] = useState([]);
    const [filters, setFilters] = useState({
        estado: '',
        fechaInicio: '',
        fechaFin: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Determinar si estamos viendo el historial de una cita específica
    const isSpecificCita = specificCitaId || id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const params = {};
                
                // Si estamos viendo el historial de una cita específica
                if (isSpecificCita) {
                    params.id_cita = specificCitaId || id;
                }

                const res = await getHistorialCitas(params);
                
                // Manejo de la respuesta del backend
                const responseData = res.data?.data || res.data || [];
                
                if (!Array.isArray(responseData)) {
                    throw new Error('Formato de respuesta inesperado del servidor');
                }

                setHistorial(responseData);
            } catch (err) {
                console.error('Error al cargar historial:', err);
                setError(err.message || 'Error al cargar el historial de citas');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [specificCitaId, id, isSpecificCita]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitFilters = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            
            const params = {};
            
            if (filters.estado) params.estado = filters.estado;
            if (filters.fechaInicio) {
                params.fecha_inicio = new Date(filters.fechaInicio).toISOString();
            }
            if (filters.fechaFin) {
                const fechaFin = new Date(filters.fechaFin);
                fechaFin.setDate(fechaFin.getDate() + 1);
                params.fecha_fin = fechaFin.toISOString();
            }
            
            if (isSpecificCita) {
                params.id_cita = specificCitaId || id;
            }

            const res = await getHistorialCitas(params);
            
            // Manejo de la respuesta del backend
            const responseData = res.data?.data || res.data || [];
            
            if (!Array.isArray(responseData)) {
                throw new Error('Formato de respuesta inesperado del servidor');
            }

            setHistorial(responseData);
        } catch (err) {
            console.error('Error al filtrar historial:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/historial-citas/${id}`);
    };

    const handleResetFilters = async () => {
        setFilters({
            estado: '',
            fechaInicio: '',
            fechaFin: ''
        });
        try {
            setLoading(true);
            setError(null);
            
            const params = isSpecificCita ? { id_cita: specificCitaId || id } : {};
            const res = await getHistorialCitas(params);
            
            // Manejo de la respuesta del backend
            const responseData = res.data?.data || res.data || [];
            
            if (!Array.isArray(responseData)) {
                throw new Error('Formato de respuesta inesperado del servidor');
            }

            setHistorial(responseData);
        } catch (err) {
            console.error('Error al resetear filtros:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p>Cargando historial de citas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="primary" onClick={handleResetFilters}>
                        Reintentar
                    </Button>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">
                <FaCalendarAlt /> 
                {isSpecificCita ? 'Historial de la Cita' : 'Historial de Citas'}
            </h2>
            
            <Card className="mb-4">
                <Card.Header>Filtros</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmitFilters}>
                        <Row>
                            <Col md={3}>
                                <Form.Group controlId="estadoFilter">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select
                                        name="estado"
                                        value={filters.estado}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Todos</option>
                                        <option value="completada">Completada</option>
                                        <option value="cancelada">Cancelada</option>
                                        <option value="reprogramada">Reprogramada</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="fechaInicioFilter">
                                    <Form.Label>Fecha desde</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fechaInicio"
                                        value={filters.fechaInicio}
                                        onChange={handleFilterChange}
                                        max={filters.fechaFin || undefined}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="fechaFinFilter">
                                    <Form.Label>Fecha hasta</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fechaFin"
                                        value={filters.fechaFin}
                                        onChange={handleFilterChange}
                                        min={filters.fechaInicio || undefined}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className="d-flex align-items-end gap-2">
                                <Button variant="primary" type="submit" className="flex-grow-1">
                                    <FaSearch /> Filtrar
                                </Button>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={handleResetFilters}
                                    title="Limpiar filtros"
                                >
                                    ×
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            {!Array.isArray(historial) || historial.length === 0 ? (
                <Alert variant="info">
                    No se encontraron registros de historial con los filtros aplicados
                </Alert>
            ) : (
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Fecha Cambio</th>
                                {!isSpecificCita && <th>ID Cita</th>}
                                <th>Médico</th>
                                <th>Especialidad</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((item) => (
                                <tr key={item.id_historial}>
                                    <td>
                                        {item.fecha_cambio ? 
                                            new Date(item.fecha_cambio).toLocaleString() : 
                                            'N/A'}
                                    </td>
                                    {!isSpecificCita && <td>{item.id_cita || 'N/A'}</td>}
                                    <td>{item.medico?.nombre || 'N/A'}</td>
                                    <td>{item.medico?.especialidad || 'N/A'}</td>
                                    <td>
                                        <span 
                                            className={`badge ${
                                                item.estado_actual === 'completada' ? 'bg-success' :
                                                item.estado_actual === 'cancelada' ? 'bg-danger' :
                                                'bg-warning'
                                            }`}
                                        >
                                            {item.estado_actual || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="info" 
                                            size="sm"
                                            onClick={() => handleViewDetails(item.id_historial)}
                                            title="Ver detalles"
                                        >
                                            <FaInfoCircle /> Detalles
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default HistorialCitasPage;