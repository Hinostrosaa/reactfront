// src/components/Pacientes/ShowPacientes.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPacientes, deletePaciente } from '../../services/api';

const ShowPacientes = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async () => {
    try {
      const res = await getPacientes();
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePaciente(id);
      loadPacientes();
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Link to="/pacientes/create" className='btn btn-primary mt-2 mb-2'>
            <i className="fa-solid fa-plus"></i> Crear Paciente
          </Link>

          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Fecha Nacimiento</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id_paciente}>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.dni}</td>
                  <td>{paciente.fecha_nacimiento}</td>
                  <td>{paciente.correo_electronico}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.direccion}</td>
                  <td>
                    <Link to={`/pacientes/edit/${paciente.id_paciente}`} className='btn btn-warning me-2'>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(paciente.id_paciente)} className='btn btn-danger'>
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

export default ShowPacientes;