import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/Cms/';

const CreateCitas = ({ onChange, values }) => {
    // Estados para los campos del formulario
    const [id_paciente, setIdPaciente] = useState(values?.id_paciente || '');
    const [id_medico, setIdMedico] = useState(values?.id_medico || '');
    const [fecha, setFecha] = useState(values?.fecha || '');
    const [estado, setEstado] = useState(values?.estado || 'pendiente');
    const [numero_confirmacion, setNumeroConfirmacion] = useState(values?.numero_confirmacion || '');

    // Estado para cargar pacientes y médicos
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Función para obtener los pacientes
    const getPacientes = async () => {
        try {
            const response = await axios.get(`${URI}pacientes`);
            setPacientes(response.data);
        } catch (error) {
            console.error("Error al obtener pacientes:", {
                message: error.message,
                url: error.config?.url,
                response: error.response?.data
            });
            setError("Error al cargar pacientes");
        }
    };

    // Función para obtener los médicos
    const getMedicos = async () => {
        try {
            const response = await axios.get(`${URI}medicos`);
            setMedicos(response.data);
        } catch (error) {
            console.error("Error al obtener médicos:", {
                message: error.message,
                url: error.config?.url,
                response: error.response?.data
            });
            setError("Error al cargar médicos");
        } finally {
            setLoading(false);
        }
    };

    // Cargar pacientes y médicos cuando el componente se monte
    useEffect(() => {
        const fetchData = async () => {
            await getPacientes();
            await getMedicos();
        };
        fetchData();
    }, []);

    // Actualizar estados cuando cambien los valores de las props
    useEffect(() => {
        if (values) {
            if (values.id_paciente !== undefined) setIdPaciente(values.id_paciente);
            if (values.id_medico !== undefined) setIdMedico(values.id_medico);
            if (values.fecha !== undefined) setFecha(values.fecha);
            if (values.estado !== undefined) setEstado(values.estado);
            if (values.numero_confirmacion !== undefined) setNumeroConfirmacion(values.numero_confirmacion);
        }
    }, [values]);

    // Manejar cambios y notificar al componente padre
    const handleChange = (field, value) => {
        switch (field) {
            case 'id_paciente':
                setIdPaciente(value);
                break;
            case 'id_medico':
                setIdMedico(value);
                break;
            case 'fecha':
                setFecha(value);
                break;
            case 'estado':
                setEstado(value);
                break;
            case 'numero_confirmacion':
                setNumeroConfirmacion(value);
                break;
            default:
                break;
        }
        
        // Notificar al componente padre si existe onChange
        if (onChange) {
            onChange(field, value);
        }
    };

    return (
        <div className="mt-4">
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p>Cargando datos...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    {/* Campo para seleccionar paciente */}
                    <div className="mb-3">
                        <label className="form-label">Paciente *</label>
                        <select 
                            value={id_paciente} 
                            onChange={(e) => handleChange('id_paciente', e.target.value)} 
                            className="form-select"
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

                    {/* Campo para seleccionar médico */}
                    <div className="mb-3">
                        <label className="form-label">Médico *</label>
                        <select 
                            value={id_medico} 
                            onChange={(e) => handleChange('id_medico', e.target.value)} 
                            className="form-select"
                            required
                        >
                            <option value="">Seleccionar Médico</option>
                            {medicos.map((medico) => (
                                <option key={medico.id_medico} value={medico.id_medico}>
                                    {medico.nombre} - {medico.especialidad}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo para seleccionar la fecha */}
                    <div className="mb-3">
                        <label className="form-label">Fecha y Hora *</label>
                        <input 
                            value={fecha} 
                            onChange={(e) => handleChange('fecha', e.target.value)}
                            type="datetime-local"
                            className="form-control"
                            required
                            min={new Date().toISOString().slice(0, 16)} // No permitir fechas pasadas
                        />
                    </div>

                    {/* Campo para estado de la cita */}
                    <div className="mb-3">
                        <label className="form-label">Estado *</label>
                        <select 
                            value={estado} 
                            onChange={(e) => handleChange('estado', e.target.value)} 
                            className="form-select"
                            required
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                    </div>

                    {/* Campo para el número de confirmación */}
                    <div className="mb-3">
                        <label className="form-label">Número de Confirmación</label>
                        <input 
                            value={numero_confirmacion} 
                            onChange={(e) => handleChange('numero_confirmacion', e.target.value)} 
                            type="text"
                            className="form-control"
                            placeholder="Opcional"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateCitas;