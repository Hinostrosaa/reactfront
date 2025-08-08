import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedicos, deleteMedico } from '../../services/api';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';


const ShowMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [searchDni, setSearchDni] = useState('');
  const [searchEspecialidad, setSearchEspecialidad] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMedicos();
  }, []);

  const loadMedicos = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getMedicos(params);
      setMedicos(res.data);
    } catch (error) {
      console.error('Error al obtener médicos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByDni = () => {
    if (searchDni.trim()) {
      loadMedicos({ dni: searchDni });
    } else {
      loadMedicos();
    }
  };

  const handleSearchByEspecialidad = () => {
    if (searchEspecialidad.trim()) {
      loadMedicos({ especialidad: searchEspecialidad });
    } else {
      loadMedicos();
    }
  };

  const handleResetSearch = () => {
    setSearchDni('');
    setSearchEspecialidad('');
    loadMedicos();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este médico?')) {
      try {
        await deleteMedico(id);
        loadMedicos();
      } catch (error) {
        console.error('Error al eliminar médico:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Lista de Médicos</h2>
            <div>
              <Link to="/medicos/create" className='btn btn-primary me-2'>
                <i className="fa-solid fa-plus me-2"></i>Crear Médico
              </Link>
              
              {/* Botones de exportación */}
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
                      onClick={() => exportToExcel(medicos, 'medicos')}
                    >
                      <i className="fas fa-file-excel text-success me-2"></i>Excel
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => exportToPDF(medicos, 'medicos')}
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
                  <label className="form-label">Buscar por Especialidad</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese especialidad"
                      value={searchEspecialidad}
                      onChange={(e) => setSearchEspecialidad(e.target.value)}
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={handleSearchByEspecialidad}
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
                  <p className="mt-2">Cargando médicos...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className='table table-hover'>
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
                      {medicos.length > 0 ? (
                        medicos.map((medico) => (
                          <tr key={medico.id_medico}>
                            <td>{medico.nombre}</td>
                            <td>{medico.dni}</td>
                            <td>{medico.especialidad}</td>
                            <td>{medico.años_experiencia}</td>
                            <td>
                              <Link 
                                to={`/medicos/edit/${medico.id_medico}`} 
                                className='btn btn-sm btn-warning me-2'
                                title="Editar"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>
                              <button 
                                onClick={() => handleDelete(medico.id_medico)} 
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
                          <td colSpan="5" className="text-center py-4">
                            No se encontraron médicos
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

export default ShowMedicos;