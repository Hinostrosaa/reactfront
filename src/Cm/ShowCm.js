import axios from 'axios'; 
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/Cms/';

const CompShowCms = () => {
    const [cms, setCms] = useState([]);
    const [tipo, setTipo] = useState('paciente');

    // Procedimiento memoizado para obtener los datos (ACTUALIZADO)
    const getCms = useCallback(async () => {
        try {
            const endpoint = tipo === 'paciente' ? 'pacientes' : 
                            tipo === 'medico' ? 'medicos' : 
                            'cita';
            const res = await axios.get(URI + endpoint);
            setCms(res.data);
        } catch (error) {
            console.error('Error al obtener los datos:', {
                message: error.message,
                url: error.config?.url,
                response: error.response?.data
            });
        }
    }, [tipo]);

    // Procedimiento para eliminar un registro (ACTUALIZADO)
    const deleteCm = async (id) => {
        try {
            const endpoint = tipo === 'paciente' ? 'pacientes' : 
                            tipo === 'medico' ? 'medicos' : 
                            'cita';
            await axios.delete(`${URI}${endpoint}/${id}`);
            getCms();
        } catch (error) {
            console.error('Error al eliminar el registro:', {
                message: error.message,
                url: error.config?.url,
                response: error.response?.data
            });
        }
    };

    useEffect(() => {
        getCms();
    }, [tipo, getCms]);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="mb-3">
                        <button 
                            onClick={() => setTipo('paciente')} 
                            className={`btn ${tipo === 'paciente' ? 'btn-primary' : 'btn-secondary'} mt-2 mb-2`}
                        >
                            Ver Pacientes
                        </button>
                        <button 
                            onClick={() => setTipo('medico')} 
                            className={`btn ${tipo === 'medico' ? 'btn-primary' : 'btn-secondary'} mt-2 mb-2`}
                        >
                            Ver Médicos
                        </button>
                        <button 
                            onClick={() => setTipo('cita')} 
                            className={`btn ${tipo === 'cita' ? 'btn-primary' : 'btn-secondary'} mt-2 mb-2`}
                        >
                            Ver Citas
                        </button>
                    </div>

                    <Link to="/create" className='btn btn-primary mt-2 mb-2'>
                        <i className="fa-solid fa-plus"></i> Crear
                    </Link>

                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Dni</th>
                                {tipo === 'paciente' && <th scope='col'>Fecha de Nacimiento</th>}
                                {tipo === 'paciente' && <th scope='col'>Correo Electrónico</th>}
                                {tipo === 'paciente' && <th scope='col'>Teléfono</th>}
                                {tipo === 'paciente' && <th scope='col'>Dirección</th>}
                                {tipo === 'medico' && <th scope='col'>Especialidad</th>}
                                {tipo === 'medico' && <th scope='col'>Años de Experiencia</th>}
                                {tipo === 'cita' && <th scope='col'>Paciente</th>}
                                {tipo === 'cita' && <th scope='col'>Médico</th>}
                                {tipo === 'cita' && <th scope='col'>Fecha</th>}
                                {tipo === 'cita' && <th scope='col'>Estado</th>}
                                {tipo === 'cita' && <th scope='col'>Confirmación</th>}
                                <th scope='col'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cms.map((cm) => (
                                <tr key={cm.id_paciente || cm.id_medico || cm.id_cita}>
                                    <td>{cm.nombre}</td>
                                    <td>{cm.dni}</td>
                                    {tipo === 'paciente' && <td>{cm.fecha_nacimiento}</td>}
                                    {tipo === 'paciente' && <td>{cm.correo_electronico}</td>}
                                    {tipo === 'paciente' && <td>{cm.telefono}</td>}
                                    {tipo === 'paciente' && <td>{cm.direccion}</td>}
                                    {tipo === 'medico' && <td>{cm.especialidad}</td>}
                                    {tipo === 'medico' && <td>{cm.años_experiencia}</td>}
                                    {tipo === 'cita' && <td>{cm.paciente?.nombre || 'N/A'}</td>}
                                    {tipo === 'cita' && <td>{cm.medico?.nombre || 'N/A'}</td>}
                                    {tipo === 'cita' && <td>{cm.fecha}</td>}
                                    {tipo === 'cita' && <td>{cm.estado}</td>}
                                    {tipo === 'cita' && <td>{cm.numero_confirmacion}</td>}
                                    <td>
                                        <Link to={`/edit/${tipo}/${cm.id_paciente || cm.id_medico || cm.id_cita}`} className='btn btn-warning'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button onClick={() => deleteCm(cm.id_paciente || cm.id_medico || cm.id_cita)} className='btn btn-danger'>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompShowCms;