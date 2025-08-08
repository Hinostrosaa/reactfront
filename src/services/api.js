// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/Cms/';

// Función para manejar respuestas y errores de forma consistente
const handleRequest = async (request) => {
  try {
    const response = await request;
    // Si el backend sigue el formato {success, data}
    if (response.data && typeof response.data.success !== 'undefined') {
      return response.data;
    }
    // Para endpoints que no siguen el formato estándar
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error:', error);
    const errorData = error.response?.data || {
      message: error.message || 'Error de conexión',
      status: error.response?.status
    };
    throw errorData;
  }
};

// Pacientes
export const getPacientes = (params = {}) => 
  handleRequest(axios.get(`${API_BASE_URL}pacientes`, { params }));export const createPaciente = (data) => handleRequest(axios.post(`${API_BASE_URL}pacientes`, data));
export const updatePaciente = (id, data) => handleRequest(axios.put(`${API_BASE_URL}pacientes/${id}`, data));
export const deletePaciente = (id) => handleRequest(axios.delete(`${API_BASE_URL}pacientes/${id}`));

// Médicos
export const getMedicos = (params = {}) => 
  handleRequest(axios.get(`${API_BASE_URL}medicos`, { params }));export const createMedico = (data) => handleRequest(axios.post(`${API_BASE_URL}medicos`, data));
export const updateMedico = (id, data) => handleRequest(axios.put(`${API_BASE_URL}medicos/${id}`, data));
export const deleteMedico = (id) => handleRequest(axios.delete(`${API_BASE_URL}medicos/${id}`));

// Citas
export const getCitas = () => handleRequest(axios.get(`${API_BASE_URL}citas`));
export const createCita = (data) => handleRequest(axios.post(`${API_BASE_URL}citas`, data));
export const updateCita = (id, data) => handleRequest(axios.put(`${API_BASE_URL}citas/${id}`, data));
export const deleteCita = (id) => handleRequest(axios.delete(`${API_BASE_URL}citas/${id}`));

// Historial de Citas
export const getHistorialCitas = (params = {}) => {
    // Convertir parámetros de fecha si es necesario
    const processedParams = {...params};
    
    if (params.fecha_inicio && !params.fecha_fin) {
        processedParams.fecha_inicio = new Date(params.fecha_inicio).toISOString();
    }
    
    if (params.fecha_fin && !params.fecha_inicio) {
        processedParams.fecha_fin = new Date(params.fecha_fin).toISOString();
    }
    
    if (params.fecha_inicio && params.fecha_fin) {
        processedParams.fecha_inicio = new Date(params.fecha_inicio).toISOString();
        const fechaFin = new Date(params.fecha_fin);
        fechaFin.setDate(fechaFin.getDate() + 1); // Incluir el día completo
        processedParams.fecha_fin = fechaFin.toISOString();
    }

    return handleRequest(axios.get(`${API_BASE_URL}historial-citas`, { 
        params: processedParams 
    }));
};

export const getDetalleHistorial = (id) => 
  handleRequest(axios.get(`${API_BASE_URL}historial-citas/${id}`));

