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
export const getPacientes = () => handleRequest(axios.get(`${API_BASE_URL}pacientes`));
export const createPaciente = (data) => handleRequest(axios.post(`${API_BASE_URL}pacientes`, data));
export const updatePaciente = (id, data) => handleRequest(axios.put(`${API_BASE_URL}pacientes/${id}`, data));
export const deletePaciente = (id) => handleRequest(axios.delete(`${API_BASE_URL}pacientes/${id}`));

// Médicos
export const getMedicos = () => handleRequest(axios.get(`${API_BASE_URL}medicos`));
export const createMedico = (data) => handleRequest(axios.post(`${API_BASE_URL}medicos`, data));
export const updateMedico = (id, data) => handleRequest(axios.put(`${API_BASE_URL}medicos/${id}`, data));
export const deleteMedico = (id) => handleRequest(axios.delete(`${API_BASE_URL}medicos/${id}`));

// Citas
export const getCitas = () => handleRequest(axios.get(`${API_BASE_URL}citas`));
export const createCita = async (data) => {
    try {
        // Validación mejorada
        if (!data.id_paciente || !data.id_medico || !data.fecha) {
            throw new Error('Datos incompletos para crear cita: id_paciente, id_medico y fecha son requeridos');
        }

        const response = await axios.post(`${API_BASE_URL}citas`, {
            ...data,
            id_paciente: parseInt(data.id_paciente, 10),
            id_medico: parseInt(data.id_medico, 10)
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.success === false) {
            throw new Error(response.data.error || 'Error al crear cita');
        }

        return response.data;
    } catch (error) {
        console.error('Error en createCita:', error);
        throw new Error(error.message || 'Error al crear cita'); // Siempre lanzamos Error
    }
};
export const updateCita = (id, data) => handleRequest(axios.put(`${API_BASE_URL}citas/${id}`, data));
export const deleteCita = (id) => handleRequest(axios.delete(`${API_BASE_URL}citas/${id}`));

// Historial de Citas
export const getHistorialCitas = (params = {}) => 
  handleRequest(axios.get(`${API_BASE_URL}historial-citas`, { params }));

export const getDetalleHistorial = (id) => 
  handleRequest(axios.get(`${API_BASE_URL}historial-citas/${id}`));

// Médicos por especialidad
// Médicos por especialidad (ruta actualizada)
export const getMedicosByEspecialidad = (params) => 
  handleRequest(axios.get(`${API_BASE_URL}medicos-por-especialidad`, { params }));

// Disponibilidad de médico
export const getDisponibilidadMedico = async (params) => {
    try {
        // Validación reforzada
        if (!params?.id_medico || isNaN(Number(params.id_medico))) {
            throw new Error('ID de médico inválido o faltante');
        }

        const response = await axios.get(`${API_BASE_URL}medicos/disponibilidad`, {
            params: {
                id_medico: Number(params.id_medico),
                fecha: params.fecha
            }
        });

        if (response.data?.success === false) {
            // Manejo especial para médico no encontrado
            if (response.data.error?.includes('no encontrado')) {
                const medicosList = response.data.medicosExistentes?.map(m => 
                    `ID ${m.id_medico}: ${m.nombre} (${m.especialidad})`).join('\n');
                throw new Error(`${response.data.error}\n\n${response.data.sugerencia}\n${medicosList}`);
            }
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error detallado:', {
            error: error.message,
            paramsEnviados: params,
            medicoSolicitado: params.id_medico
        });
        throw error;
    }
};

// Verificar disponibilidad
export const verificarDisponibilidad = (params) => 
    handleRequest(axios.get(`${API_BASE_URL}medicos/verificar-disponibilidad`, { params }));
// Especialidades (ruta actualizada)
export const getEspecialidades = () => 
  handleRequest(axios.get(`${API_BASE_URL}especialidades`));