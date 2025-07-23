// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/Cms/';

export const getPacientes = () => axios.get(`${API_BASE_URL}pacientes`);
export const createPaciente = (data) => axios.post(`${API_BASE_URL}pacientes`, data);
export const updatePaciente = (id, data) => axios.put(`${API_BASE_URL}pacientes/${id}`, data);
export const deletePaciente = (id) => axios.delete(`${API_BASE_URL}pacientes/${id}`);

export const getMedicos = () => axios.get(`${API_BASE_URL}medicos`);
export const createMedico = (data) => axios.post(`${API_BASE_URL}medicos`, data);
export const updateMedico = (id, data) => axios.put(`${API_BASE_URL}medicos/${id}`, data);
export const deleteMedico = (id) => axios.delete(`${API_BASE_URL}medicos/${id}`);

// CORRECCIÓN PARA CITAS:
export const getCitas = () => axios.get(`${API_BASE_URL}citas`); // Cambiado de 'cita' a 'citas'
export const createCita = (data) => axios.post(`${API_BASE_URL}citas`, data); // Cambiado de 'cita' a 'citas'
export const updateCita = (id, data) => axios.put(`${API_BASE_URL}citas/${id}`, data); // Cambiado de 'cita' a 'citas'
export const deleteCita = (id) => axios.delete(`${API_BASE_URL}citas/${id}`); // Cambiado de 'cita' a 'citas'

// Agregar estas funciones
export const getHistorialCitas = (params = {}) => axios.get(`${API_BASE_URL}historial-citas`, { params });
export const getDetalleHistorial = (id) => axios.get(`${API_BASE_URL}historial-citas/${id}`);