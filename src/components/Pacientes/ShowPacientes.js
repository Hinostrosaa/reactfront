import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPacientes, deletePaciente } from '../../services/api';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';

const ShowPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [searchDni, setSearchDni] = useState('');
  const [searchNombre, setSearchNombre] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getPacientes(params);
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByDni = () => {
    if (searchDni.trim()) {
      loadPacientes({ dni: searchDni });
    } else {
      loadPacientes();
    }
  };

  const handleSearchByNombre = () => {
    if (searchNombre.trim()) {
      loadPacientes({ nombre: searchNombre });
    } else {
      loadPacientes();
    }
  };

  const handleResetSearch = () => {
    setSearchDni('');
    setSearchNombre('');
    loadPacientes();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      try {
        await deletePaciente(id);
        loadPacientes();
      } catch (error) {
        console.error('Error al eliminar paciente:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Lista de Pacientes</h2>
            <div>
              <Link to="/pacientes/create" className='btn btn-primary me-2'>
                <i className="fa-solid fa-plus me-2"></i>Crear Paciente
              </Link>
              
              <div className="btn-group">
                <button 
                  className="btn btn-success dropdown-toggle" 
                  type="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className="fas fa-file-export me-2"></i>Exportar
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => exportToExcel(pacientes, 'pacientes')}
                    >
                      <i className="fas fa-file-excel text-success me-2"></i>Excel
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => exportToPDF(pacientes, 'pacientes')}
                    >
                      <i className="fas fa-file-pdf text-danger me-2"></i>PDF
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Filtros de búsqueda */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-5">
                  <label className="form-label">Buscar por DNI</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese DNI"
                      value={searchDni}
                      onChange={(e) => setSearchDni(e.target.value)}
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={handleSearchByDni}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                
                <div className="col-md-5">
                  <label className="form-label">Buscar por Nombre</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese nombre"
                      value={searchNombre}
                      onChange={(e) => setSearchNombre(e.target.value)}
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={handleSearchByNombre}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                
                <div className="col-md-2 d-flex align-items-end">
                  <button 
                    className="btn btn-outline-danger w-100"
                    onClick={handleResetSearch}
                  >
                    <i className="fas fa-undo me-2"></i>Resetear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de resultados */}
          <div className="card">
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-2">Cargando pacientes...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className='table table-hover'>
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
                      {pacientes.length > 0 ? (
                        pacientes.map((paciente) => (
                          <tr key={paciente.id_paciente}>
                            <td>{paciente.nombre}</td>
                            <td>{paciente.dni}</td>
                            <td>{new Date(paciente.fecha_nacimiento).toLocaleDateString()}</td>
                            <td>{paciente.correo_electronico}</td>
                            <td>{paciente.telefono}</td>
                            <td>{paciente.direccion}</td>
                            <td>
                              <Link 
                                to={`/pacientes/edit/${paciente.id_paciente}`} 
                                className='btn btn-sm btn-warning me-2'
                                title="Editar"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>
                              <button 
                                onClick={() => handleDelete(paciente.id_paciente)} 
                                className='btn btn-sm btn-danger'
                                title="Eliminar"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            No se encontraron pacientes
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPacientes;