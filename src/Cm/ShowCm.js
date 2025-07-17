import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/Cms/';  // Ruta base del backend

const CompShowCms = () => {
    const [cms, setCms] = useState([]);
    const [tipo, setTipo] = useState('paciente');  // Estado para seleccionar tipo (paciente o medico)

    // Procedimiento para obtener los datos de pacientes o médicos
    const getCms = async () => {
        try {
            const res = await axios.get(URI + tipo);  // Se solicita a la ruta correcta
            setCms(res.data);  // Guardamos los datos de pacientes o médicos
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    // Procedimiento para eliminar un paciente o médico
    const deleteCm = async (id) => {
        try {
            await axios.delete(`${URI}${tipo}/${id}`);  // Eliminamos dependiendo del tipo (paciente o medico)
            getCms();  // Refresca los datos después de eliminar
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    useEffect(() => {
        getCms();
    }, [tipo]);  // Se vuelve a obtener los datos cuando se cambia el tipo (paciente o medico)

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="mb-3">
                        {/* Botones para cambiar entre Pacientes y Médicos */}
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
                    </div>

                    <Link to="/create" className='btn btn-primary mt-2 mb-2'>
                        <i className="fa-solid fa-plus"></i>
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
                                <th scope='col'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cms.map((cm) => (
                                <tr key={cm.id_paciente || cm.id_medico}>
                                    <td>{cm.nombre}</td>
                                    <td>{cm.dni}</td>
                                    {tipo === 'paciente' && <td>{cm.fecha_nacimiento}</td>}
                                    {tipo === 'paciente' && <td>{cm.correo_electronico}</td>}
                                    {tipo === 'paciente' && <td>{cm.telefono}</td>}
                                    {tipo === 'paciente' && <td>{cm.direccion}</td>}
                                    {tipo === 'medico' && <td>{cm.especialidad}</td>}
                                    {tipo === 'medico' && <td>{cm.años_experiencia}</td>}
                                    <td>
                                        <Link to={`/edit/${tipo}/${cm.id_paciente || cm.id_medico}`} className='btn btn-warning'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button onClick={() => deleteCm(cm.id_paciente || cm.id_medico)} className='btn btn-danger'>
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
