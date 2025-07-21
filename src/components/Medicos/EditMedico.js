import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMedicos, updateMedico } from '../../services/api';

const EditMedico = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    especialidad: '',
    años_experiencia: ''
  });

  useEffect(() => {
    const loadMedico = async () => {
      try {
        const res = await getMedicos();
        const medico = res.data.find(m => m.id_medico === id);
        if (medico) {
          setFormData({
            nombre: medico.nombre,
            dni: medico.dni,
            especialidad: medico.especialidad,
            años_experiencia: medico.años_experiencia
          });
        }
      } catch (error) {
        console.error('Error al cargar médico:', error);
      }
    };
    loadMedico();
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
      await updateMedico(id, formData);
      navigate('/medicos');
    } catch (error) {
      console.error('Error al actualizar médico:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Editar Médico</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Nombre</label>
                  <input 
                    name="nombre"
                    value={formData.nombre} 
                    onChange={handleChange}
                    type='text'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>DNI</label>
                  <input 
                    name="dni"
                    value={formData.dni} 
                    onChange={handleChange}
                    type='text'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Especialidad</label>
                  <input 
                    name="especialidad"
                    value={formData.especialidad} 
                    onChange={handleChange}
                    type='text'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Años de Experiencia</label>
                  <input 
                    name="años_experiencia"
                    value={formData.años_experiencia} 
                    onChange={handleChange}
                    type='number'
                    className='form-control'
                    min="0"
                    required
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

export default EditMedico;