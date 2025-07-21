import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMedico } from '../../services/api';

const CreateMedico = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    especialidad: '',
    años_experiencia: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedico(formData);
      navigate('/medicos');
    } catch (error) {
      console.error('Error al crear médico:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Crear Médico</h3>
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
                    <i className="fas fa-save me-2"></i>Guardar
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

export default CreateMedico;