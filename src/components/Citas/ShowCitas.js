import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCitas, deleteCita } from '../../services/api';
import { getPacientes } from '../../services/api';
import { getMedicos } from '../../services/api';

const ShowCitas = () => {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [citasRes, pacientesRes, medicosRes] = await Promise.all([
          getCitas(),
          getPacientes(),
          getMedicos()
        ]);
        
        setCitas(citasRes.data);
        setPacientes(pacientesRes.data);
        setMedicos(medicosRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCita(id);
      setCitas(citas.filter(cita => cita.id_cita !== id));
    } catch (error) {
      console.error('Error al eliminar cita:', error);
    }
  };

  const getNombrePaciente = (id) => {
    const paciente = pacientes.find(p => p.id_paciente === id);
    return paciente ? paciente.nombre : 'N/A';
  };

  const getNombreMedico = (id) => {
    const medico = medicos.find(m => m.id_medico === id);
    return medico ? medico.nombre : 'N/A';
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando citas...</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Link to="/citas/create" className='btn btn-primary mt-2 mb-2'>
            <i className="fa-solid fa-plus"></i> Crear Cita
          </Link>

          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Confirmación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id_cita}>
                  <td>{getNombrePaciente(cita.id_paciente)}</td>
                  <td>{getNombreMedico(cita.id_medico)}</td>
                  <td>{new Date(cita.fecha).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${cita.estado === 'confirmada' ? 'bg-success' : 
                                    cita.estado === 'cancelada' ? 'bg-danger' : 'bg-warning'}`}>
                      {cita.estado}
                    </span>
                  </td>
                  <td>{cita.numero_confirmacion || 'N/A'}</td>
                  <td>
                    <Link to={`/citas/edit/${cita.id_cita}`} className='btn btn-warning me-2'>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(cita.id_cita)} className='btn btn-danger'>
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

export default ShowCitas;