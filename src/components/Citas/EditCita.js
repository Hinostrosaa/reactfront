import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCitas, updateCita } from '../../services/api';
import { getPacientes } from '../../services/api';
import { getMedicos } from '../../services/api';

const EditCita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_paciente: '',
    id_medico: '',
    fecha: '',
    estado: 'pendiente',
    numero_confirmacion: ''
  });
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
        
        const cita = citasRes.data.find(c => c.id_cita === id);
        if (cita) {
          setFormData({
            id_paciente: cita.id_paciente,
            id_medico: cita.id_medico,
            fecha: cita.fecha.slice(0, 16), // Ajustar formato para input datetime-local
            estado: cita.estado,
            numero_confirmacion: cita.numero_confirmacion || ''
          });
        }
        
        setPacientes(pacientesRes.data);
        setMedicos(medicosRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCita(id, formData);
      navigate('/citas');
    } catch (error) {
      console.error('Error al actualizar cita:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Editar Cita Médica</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Paciente *</label>
                  <select 
                    name="id_paciente"
                    value={formData.id_paciente} 
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Seleccionar Paciente</option>
                    {pacientes.map((paciente) => (
                      <option key={paciente.id_paciente} value={paciente.id_paciente}>
                        {paciente.nombre} (DNI: {paciente.dni})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Médico *</label>
                  <select 
                    name="id_medico"
                    value={formData.id_medico} 
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Seleccionar Médico</option>
                    {medicos.map((medico) => (
                      <option key={medico.id_medico} value={medico.id_medico}>
                        {medico.nombre} - {medico.especialidad}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha y Hora *</label>
                  <input 
                    name="fecha"
                    value={formData.fecha} 
                    onChange={handleChange}
                    type="datetime-local"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Estado *</label>
                  <select 
                    name="estado"
                    value={formData.estado} 
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Número de Confirmación</label>
                  <input 
                    name="numero_confirmacion"
                    value={formData.numero_confirmacion} 
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Opcional"
                  />
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button type='submit' className='btn btn-primary'>
                    <i className="fas fa-save me-2"></i>Actualizar
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

export default EditCita;