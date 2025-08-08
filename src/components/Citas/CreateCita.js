import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCita } from '../../services/api';
import { getPacientes } from '../../services/api';
import DisponibilidadMedicos from './DisponibilidadMedicos';
import { Alert, Spinner } from 'react-bootstrap';

const CreateCita = () => {
    const [pacientes, setPacientes] = useState([]);
    const [selectedPacienteId, setSelectedPacienteId] = useState(''); // Cambiado a manejar solo el ID
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPacientes = async () => {
            try {
                const response = await getPacientes();
                setPacientes(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        loadPacientes();
    }, []);

    const handleCitaConfirmada = async (citaData) => {
        try {
            await createCita({
                ...citaData,
                id_paciente: selectedPacienteId // Asegurarnos de usar el ID seleccionado
            });
            navigate('/citas');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p>Cargando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Crear Cita Médica</h3>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <h5>Paso 1: Seleccionar Paciente</h5>
                                <select 
                                    className="form-select"
                                    value={selectedPacienteId}
                                    onChange={(e) => setSelectedPacienteId(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar Paciente</option>
                                    {pacientes.map((paciente) => (
                                        <option key={paciente.id_paciente} value={paciente.id_paciente}>
                                            {paciente.nombre} (DNI: {paciente.dni})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedPacienteId && (
                                <>
                                    <hr />
                                    <h5>Paso 2: Seleccionar Médico y Horario</h5>
                                    <DisponibilidadMedicos 
                                        pacienteId={selectedPacienteId}
                                        onSelectCita={handleCitaConfirmada}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCita;