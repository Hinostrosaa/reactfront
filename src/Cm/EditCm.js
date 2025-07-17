import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/Cms/';

const CompEditCm = () => {
    const [tipo, setTipo] = useState('');
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [correo_electronico, setCorreo_electronico] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [años_experiencia, setAños_experiencia] = useState('');
    
    const navigate = useNavigate();
    const { tipo: tipoParam, id } = useParams();

    useEffect(() => {
        setTipo(tipoParam);
        getCmById();
    }, [tipoParam, id, getCmById]);  // Agrega getCmById como dependencia

    // Procedimiento para obtener los datos
    const getCmById = async () => {
        try {
            const res = await axios.get(URI + (tipo === 'medico' ? `medicos/${id}` : `pacientes/${id}`));
            setNombre(res.data.nombre);
            setDni(res.data.dni);

            if (tipo === 'medico') {
                setEspecialidad(res.data.especialidad);
                setAños_experiencia(res.data.años_experiencia);
            } else {
                setFecha_nacimiento(res.data.fecha_nacimiento);
                setCorreo_electronico(res.data.correo_electronico);
                setTelefono(res.data.telefono);
                setDireccion(res.data.direccion);
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const update = async (e) => {
        e.preventDefault();

        const data = { nombre, dni };

        if (tipo === 'medico') {
            data.especialidad = especialidad;
            data.años_experiencia = años_experiencia;
        } else {
            data.fecha_nacimiento = fecha_nacimiento;
            data.correo_electronico = correo_electronico;
            data.telefono = telefono;
            data.direccion = direccion;
        }

        const endpoint = tipo === 'medico' ? `medicos/${id}` : `pacientes/${id}`;

        try {
            await axios.put(URI + endpoint, data);
            navigate('/');
        } catch (error) {
            console.error('Hubo un error al actualizar el registro:', error);
        }
    };

    return (
        <div>
            <h3>{tipo === 'medico' ? 'Editar Médico' : 'Editar Paciente'}</h3>
            <form onSubmit={update}>
                {/* Campos comunes para Pacientes y Médicos */}
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' className='form-control'/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>DNI</label>
                    <input value={dni} onChange={(e) => setDni(e.target.value)} type='text' className='form-control'/>
                </div>

                {/* Si es un paciente, se añaden campos específicos */}
                {tipo === 'paciente' && (
                    <>
                        <div className='mb-3'>
                            <label className='form-label'>Fecha de Nacimiento</label>
                            <input value={fecha_nacimiento} onChange={(e) => setFecha_nacimiento(e.target.value)} type='date' className='form-control'/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Correo Electrónico</label>
                            <input value={correo_electronico} onChange={(e) => setCorreo_electronico(e.target.value)} type='email' className='form-control'/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Teléfono</label>
                            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} type='text' className='form-control'/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Dirección</label>
                            <input value={direccion} onChange={(e) => setDireccion(e.target.value)} type='text' className='form-control'/>
                        </div>
                    </>
                )}

                {/* Campos específicos solo si es Médico */}
                {tipo === 'medico' && (
                    <>
                        <div className='mb-3'>
                            <label className='form-label'>Especialidad</label>
                            <input value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} type='text' className='form-control'/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Años de Experiencia</label>
                            <input value={años_experiencia} onChange={(e) => setAños_experiencia(e.target.value)} type='number' className='form-control'/>
                        </div>
                    </>
                )}

                <button type='submit' className='btn btn-primary mt-2'>Actualizar</button>
            </form>
        </div>
    );
};

export default CompEditCm;
