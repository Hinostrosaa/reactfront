import axios from "axios"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePaciente from './CreatePaciente';
import CreateMedico from './CreateMedico';
import CreateCitas from './CreateCitas';

const URI = 'http://localhost:8000/Cms/';

const CompCreateCm = () => {
    const [tipo, setTipo] = useState('paciente');
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const navigate = useNavigate();

    // Estados para campos específicos
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [correo_electronico, setCorreo_electronico] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [años_experiencia, setAños_experiencia] = useState('');
    const [id_paciente, setId_paciente] = useState('');
    const [id_medico, setId_medico] = useState('');
    const [fecha, setFecha] = useState('');
    const [estado, setEstado] = useState('pendiente');
    const [numero_confirmacion, setNumero_confirmacion] = useState('');

    const store = async (e) => {
        e.preventDefault();

        // Determinar el endpoint correcto (actualizado para coincidir con el backend)
        const endpoint = tipo === 'paciente' ? 'pacientes' : 
                        tipo === 'medico' ? 'medicos' : 
                        'cita';

        // Crear el objeto de datos según el tipo
        let data = {};
        if (tipo === 'paciente') {
            data = {
                nombre,
                dni,
                fecha_nacimiento,
                correo_electronico,
                telefono,
                direccion
            };
        } else if (tipo === 'medico') {
            data = {
                nombre,
                dni,
                especialidad,
                años_experiencia
            };
        } else { // Cita
            data = {
                id_paciente,
                id_medico,
                fecha,
                estado,
                numero_confirmacion
            };
        }

        try {
            await axios.post(URI + endpoint, data);
            navigate('/');
        } catch (error) {
            console.error('Error al crear el registro:', {
                message: error.message,
                url: error.config?.url,
                response: error.response?.data
            });
        }
    };

    const onChange = (field, value) => {
        switch (field) {
            case 'fecha_nacimiento': setFecha_nacimiento(value); break;
            case 'correo_electronico': setCorreo_electronico(value); break;
            case 'telefono': setTelefono(value); break;
            case 'direccion': setDireccion(value); break;
            case 'especialidad': setEspecialidad(value); break;
            case 'años_experiencia': setAños_experiencia(value); break;
            case 'id_paciente': setId_paciente(value); break;
            case 'id_medico': setId_medico(value); break;
            case 'fecha': setFecha(value); break;
            case 'estado': setEstado(value); break;
            case 'numero_confirmacion': setNumero_confirmacion(value); break;
            default: break;
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">
                                {tipo === 'paciente' ? 'Crear Paciente' : 
                                 tipo === 'medico' ? 'Crear Médico' : 
                                 'Crear Cita'}
                            </h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={store}>
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo de Registro</label>
                                    <select 
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)} 
                                        className='form-select'
                                    >
                                        <option value="paciente">Paciente</option>
                                        <option value="medico">Médico</option>
                                        <option value="cita">Cita</option>
                                    </select>
                                </div>

                                {/* Campos comunes para Pacientes y Médicos */}
                                {(tipo === 'paciente' || tipo === 'medico') && (
                                    <>
                                        <div className='mb-3'>
                                            <label className='form-label'>Nombre</label>
                                            <input 
                                                value={nombre} 
                                                onChange={(e) => setNombre(e.target.value)}
                                                type='text'
                                                className='form-control'
                                                required
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label className='form-label'>DNI</label>
                                            <input 
                                                value={dni} 
                                                onChange={(e) => setDni(e.target.value)}
                                                type='text'
                                                className='form-control'
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Componentes específicos */}
                                {tipo === 'paciente' && (
                                    <CreatePaciente 
                                        onChange={onChange}
                                        values={{fecha_nacimiento, correo_electronico, telefono, direccion}}
                                    />
                                )}

                                {tipo === 'medico' && (
                                    <CreateMedico 
                                        onChange={onChange}
                                        values={{especialidad, años_experiencia}}
                                    />
                                )}

                                {tipo === 'cita' && (
                                    <CreateCitas 
                                        onChange={onChange}
                                        values={{id_paciente, id_medico, fecha, estado, numero_confirmacion}}
                                    />
                                )}

                                <div className="d-grid gap-2 mt-4">
                                    <button type='submit' className='btn btn-primary'>
                                        <i className="fas fa-save me-2"></i>Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompCreateCm;