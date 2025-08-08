import React, { useState, useEffect } from 'react';
import { Button, Card, Spinner, Alert, Form, Row, Col, Modal } from 'react-bootstrap';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { getMedicosByEspecialidad, getDisponibilidadMedico, verificarDisponibilidad, getEspecialidades } from '../../services/api';

const DisponibilidadMedicos = ({ onSelectCita, pacienteId }) => {
    const [especialidades, setEspecialidades] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [disponibilidad, setDisponibilidad] = useState([]);
    const [loading, setLoading] = useState({
        especialidades: false,
        medicos: false,
        disponibilidad: false,
        verificacion: false
    });
    const [error, setError] = useState(null);
    const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
    const [selectedMedico, setSelectedMedico] = useState(null);
    const [selectedFecha, setSelectedFecha] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedHorario, setSelectedHorario] = useState(null);

    // Cargar especialidades al montar el componente
    useEffect(() => {
        const cargarEspecialidades = async () => {
            try {
                setLoading(prev => ({ ...prev, especialidades: true }));
                setError(null);
                const response = await getEspecialidades();
                if (response.success) {
                    setEspecialidades(response.data || []);
                } else {
                    throw new Error(response.error || 'Error al cargar especialidades');
                }
            } catch (error) {
                console.error('Error al cargar especialidades:', error);
                setError(error.message);
            } finally {
                setLoading(prev => ({ ...prev, especialidades: false }));
            }
        };
        cargarEspecialidades();
    }, []);

    // Cargar médicos cuando se selecciona especialidad
    useEffect(() => {
        if (selectedEspecialidad) {
            const cargarMedicos = async () => {
                try {
                    setLoading(prev => ({ ...prev, medicos: true }));
                    setError(null);
                    const response = await getMedicosByEspecialidad({ 
                        especialidad: selectedEspecialidad 
                    });
                    
                    if (response.success) {
                        setMedicos(response.data || []);
                    } else {
                        throw new Error(response.error || 'Error al cargar médicos');
                    }
                } catch (error) {
                    console.error('Error al cargar médicos:', error);
                    setError(error.message);
                } finally {
                    setLoading(prev => ({ ...prev, medicos: false }));
                }
            };
            cargarMedicos();
        } else {
            setMedicos([]);
            setSelectedMedico(null);
        }
    }, [selectedEspecialidad]);

    // Cargar disponibilidad cuando se selecciona médico y fecha
    useEffect(() => {
        if (selectedMedico && selectedFecha) {
            const cargarDisponibilidad = async () => {
                try {
                    setLoading(prev => ({ ...prev, disponibilidad: true }));
                    setError(null);
                    const response = await getDisponibilidadMedico({ 
                        id_medico: selectedMedico.id_medico, 
                        fecha: selectedFecha 
                    });
                    
                    if (response.success) {
                        setDisponibilidad(response.disponibilidad || []);
                    } else {
                        throw new Error(response.error || 'Error al cargar disponibilidad');
                    }
                } catch (error) {
                    console.error('Error al cargar disponibilidad:', error);
                    setError(error.message);
                } finally {
                    setLoading(prev => ({ ...prev, disponibilidad: false }));
                }
            };
            cargarDisponibilidad();
        } else {
            setDisponibilidad([]);
        }
    }, [selectedMedico, selectedFecha]);

    const handleSelectHorario = async (horario) => {
        try {
            setLoading(prev => ({ ...prev, verificacion: true }));
            setError(null);
            
            const response = await verificarDisponibilidad({
                id_medico: selectedMedico.id_medico,
                fecha: horario.hora
            });
            
            if (response.disponible) {
                setSelectedHorario(horario);
                setShowConfirmModal(true);
            } else {
                setError('El horario seleccionado ya no está disponible');
                // Actualizar disponibilidad
                setDisponibilidad(prev => prev.map(slot => 
                    slot.hora === horario.hora ? { ...slot, disponible: false } : slot
                ));
            }
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error);
            setError(error.message || 'Error al verificar disponibilidad');
        } finally {
            setLoading(prev => ({ ...prev, verificacion: false }));
        }
    };

    const handleConfirmarCita = () => {
        if (!selectedHorario || !selectedMedico || !pacienteId) {
            setError('Datos incompletos para crear la cita');
            return;
        }

        const citaData = {
            id_paciente: pacienteId,
            id_medico: selectedMedico.id_medico,
            fecha: selectedHorario.hora,
            estado: 'pendiente'
        };
        
        onSelectCita(citaData);
        setShowConfirmModal(false);
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="container mt-4">
            <Card>
                <Card.Header className="bg-primary text-white">
                    <h4><FaCalendarAlt /> Agendar Nueva Cita</h4>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

                    <Row className="mb-4">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Especialidad Médica</Form.Label>
                                <Form.Select
                                    value={selectedEspecialidad}
                                    onChange={(e) => {
                                        setSelectedEspecialidad(e.target.value);
                                        setSelectedMedico(null);
                                        setSelectedFecha('');
                                    }}
                                    disabled={loading.especialidades}
                                >
                                    <option value="">Seleccione una especialidad</option>
                                    {especialidades.map((esp, index) => (
                                        <option key={index} value={esp}>{esp}</option>
                                    ))}
                                </Form.Select>
                                {loading.especialidades && <Spinner animation="border" size="sm" className="ms-2" />}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Médico</Form.Label>
                                <Form.Select
                                    value={selectedMedico?.id_medico || ''}
                                    onChange={(e) => {
                                        const medicoId = e.target.value;
                                        const medico = medicos.find(m => m.id_medico == medicoId);
                                        setSelectedMedico(medico || null);
                                        setSelectedFecha('');
                                    }}
                                    disabled={!selectedEspecialidad || loading.medicos}
                                >
                                    <option value="">Seleccione un médico</option>
                                    {medicos.map(medico => (
                                        <option key={medico.id_medico} value={medico.id_medico}>
                                            {medico.nombre} - {medico.especialidad}
                                        </option>
                                    ))}
                                </Form.Select>
                                {loading.medicos && <Spinner animation="border" size="sm" className="ms-2" />}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={selectedFecha}
                                    onChange={(e) => setSelectedFecha(e.target.value)}
                                    disabled={!selectedMedico || loading.medicos}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {loading.disponibilidad && (
                        <div className="text-center my-4">
                            <Spinner animation="border" />
                            <p>Cargando disponibilidad...</p>
                        </div>
                    )}

                    {disponibilidad.length > 0 && (
                        <div>
                            <h5>Horarios disponibles para el {formatDate(selectedFecha)}</h5>
                            <p>Médico: {selectedMedico.nombre} - {selectedMedico.especialidad}</p>
                            
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {disponibilidad.map((slot, index) => (
                                    <Button
                                        key={index}
                                        variant={slot.disponible ? 'outline-success' : 'outline-danger'}
                                        className="position-relative"
                                        onClick={() => slot.disponible && handleSelectHorario(slot)}
                                        disabled={!slot.disponible || loading.verificacion}
                                    >
                                        {slot.horaFormateada}
                                        {slot.disponible ? (
                                            <FaCheckCircle className="ms-2" />
                                        ) : (
                                            <FaTimesCircle className="ms-2" />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Modal de confirmación */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedHorario && selectedMedico && (
                        <>
                            <p>¿Confirmar la siguiente cita?</p>
                            <ul>
                                <li><strong>Médico:</strong> {selectedMedico.nombre}</li>
                                <li><strong>Especialidad:</strong> {selectedMedico.especialidad}</li>
                                <li><strong>Fecha:</strong> {formatDate(selectedHorario.hora)}</li>
                                <li><strong>Hora:</strong> {selectedHorario.horaFormateada}</li>
                            </ul>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleConfirmarCita}
                        disabled={loading.verificacion}
                    >
                        {loading.verificacion ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Confirmando...
                            </>
                        ) : 'Confirmar Cita'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DisponibilidadMedicos;