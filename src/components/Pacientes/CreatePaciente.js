// src/components/Pacientes/CreatePaciente.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPaciente } from '../../services/api';

const CreatePaciente = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    fecha_nacimiento: '',
    correo_electronico: '',
    telefono: '',
    direccion: ''
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
      await createPaciente(formData);
      navigate('/pacientes');
    } catch (error) {
      console.error('Error al crear paciente:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Crear Paciente</h3>
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
                  <label className='form-label'>Fecha de Nacimiento</label>
                  <input 
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento} 
                    onChange={handleChange}
                    type='date'
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Correo Electrónico</label>
                  <input 
                    name="correo_electronico"
                    value={formData.correo_electronico} 
                    onChange={handleChange}
                    type='email'
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Teléfono</label>
                  <input 
                    name="telefono"
                    value={formData.telefono} 
                    onChange={handleChange}
                    type='text'
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Dirección</label>
                  <input 
                    name="direccion"
                    value={formData.direccion} 
                    onChange={handleChange}
                    type='text'
                    className='form-control'
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

export default CreatePaciente;