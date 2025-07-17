import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/';

const CompCreateCm = () => {
    const [tipo, setTipo] = useState('paciente');  // Estado para seleccionar tipo (paciente o medico)
    
    // Estados comunes para ambos formularios
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [correo_electronico, setCorreo_electronico] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    // Estados específicos para médicos (solo los requeridos por el backend)
    const [especialidad, setEspecialidad] = useState('');
    const [años_experiencia, setAños_experiencia] = useState('');
    
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();

        // Crear el objeto de datos que será enviado al backend
        const data = {
            nombre: nombre,
            dni: dni,
        };

        // Si es un médico, añadir los campos específicos
        if (tipo === 'medico') {
            data.especialidad = especialidad;
            data.años_experiencia = años_experiencia;
        } else {
            // Si es un paciente, agregar los campos correspondientes
            data.fecha_nacimiento = fecha_nacimiento;
            data.correo_electronico = correo_electronico;
            data.telefono = telefono;
            data.direccion = direccion;
        }

        const endpoint = tipo === 'medico' ? 'medicos' : 'pacientes';  // Determinar el endpoint

        try {
            await axios.post(URI + endpoint, data);
            navigate('/');  // Redirige al inicio o a alguna otra ruta
        } catch (error) {
            console.error('Hubo un error al crear el registro:', error);
        }
    };

    return (
        <div>
            <h3>{tipo === 'medico' ? 'Crear Médico' : 'Crear Paciente'}</h3>
            <form onSubmit={store}>
                {/* Campo para seleccionar tipo de entidad */}
                <div className='mb-3'>
                    <label className='form-label'>Tipo de Registro</label>
                    <select 
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)} 
                        className='form-control'
                    >
                        <option value="paciente">Paciente</option>
                        <option value="medico">Médico</option>
                    </select>
                </div>

                {/* Campos comunes para Pacientes y Médicos */}
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>DNI</label>
                    <input 
                        value={dni} 
                        onChange={(e) => setDni(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>

                {/* Si es un paciente, se añaden campos específicos */}
                {tipo === 'paciente' && (
                    <>
                        <div className='mb-3'>
                            <label className='form-label'>Fecha de Nacimiento</label>
                            <input 
                                value={fecha_nacimiento} 
                                onChange={(e) => setFecha_nacimiento(e.target.value)}
                                type='date'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Correo Electrónico</label>
                            <input 
                                value={correo_electronico} 
                                onChange={(e) => setCorreo_electronico(e.target.value)}
                                type='email'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Teléfono</label>
                            <input 
                                value={telefono} 
                                onChange={(e) => setTelefono(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Dirección</label>
                            <input 
                                value={direccion} 
                                onChange={(e) => setDireccion(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                    </>
                )}

                {/* Campos específicos solo si es Médico */}
                {tipo === 'medico' && (
                    <>
                        <div className='mb-3'>
                            <label className='form-label'>Especialidad</label>
                            <input 
                                value={especialidad} 
                                onChange={(e) => setEspecialidad(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Años de Experiencia</label>
                            <input 
                                value={años_experiencia} 
                                onChange={(e) => setAños_experiencia(e.target.value)}
                                type='number'
                                className='form-control'
                            />
                        </div>
                    </>
                )}

                <button type='submit' className='btn btn-primary mt-2'>Crear</button>
            </form>
        </div>
    );
};

export default CompCreateCm;
