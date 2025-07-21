import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedicos, deleteMedico } from '../../services/api';

const ShowMedicos = () => {
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    loadMedicos();
  }, []);

  const loadMedicos = async () => {
    try {
      const res = await getMedicos();
      setMedicos(res.data);
    } catch (error) {
      console.error('Error al obtener médicos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedico(id);
      loadMedicos();
    } catch (error) {
      console.error('Error al eliminar médico:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Link to="/medicos/create" className='btn btn-primary mt-2 mb-2'>
            <i className="fa-solid fa-plus"></i> Crear Médico
          </Link>

          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Especialidad</th>
                <th>Años Experiencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicos.map((medico) => (
                <tr key={medico.id_medico}>
                  <td>{medico.nombre}</td>
                  <td>{medico.dni}</td>
                  <td>{medico.especialidad}</td>
                  <td>{medico.años_experiencia}</td>
                  <td>
                    <Link to={`/medicos/edit/${medico.id_medico}`} className='btn btn-warning me-2'>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(medico.id_medico)} className='btn btn-danger'>
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

export default ShowMedicos;