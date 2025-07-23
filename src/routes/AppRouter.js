// src/routes/AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PacientesPage from '../pages/PacientesPage';
import MedicosPage from '../pages/MedicosPage';
import CitasPage from '../pages/CitasPage';
import HistorialCitasPage from '../pages/HistorialCitasPage';
import DetalleHistorialPage from '../pages/DetalleHistorialPage';
import CreatePaciente from '../components/Pacientes/CreatePaciente';
import EditPaciente from '../components/Pacientes/EditPaciente';
import CreateMedico from '../components/Medicos/CreateMedico';
import EditMedico from '../components/Medicos/EditMedico';
import CreateCita from '../components/Citas/CreateCita';
import EditCita from '../components/Citas/EditCita';
import Layout from '../components/shared/Layout';

const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      
      {/* Rutas de Pacientes */}
      <Route path="/pacientes" element={<Layout><PacientesPage /></Layout>} />
      <Route path="/pacientes/create" element={<Layout><CreatePaciente /></Layout>} />
      <Route path="/pacientes/edit/:id" element={<Layout><EditPaciente /></Layout>} />
      
      {/* Rutas de Médicos */}
      <Route path="/medicos" element={<Layout><MedicosPage /></Layout>} />
      <Route path="/medicos/create" element={<Layout><CreateMedico /></Layout>} />
      <Route path="/medicos/edit/:id" element={<Layout><EditMedico /></Layout>} />
      
      {/* Rutas de Citas */}
      <Route path="/citas" element={<Layout><CitasPage /></Layout>} />
      <Route path="/citas/create" element={<Layout><CreateCita /></Layout>} />
      <Route path="/citas/edit/:id" element={<Layout><EditCita /></Layout>} />
      
      {/* Nuevas Rutas de Historial de Citas */}
      <Route path="/historial-citas" element={<Layout><HistorialCitasPage /></Layout>} />
      <Route path="/historial-citas/:id" element={<Layout><DetalleHistorialPage /></Layout>} />
      
      {/* Ruta para ver historial de una cita específica */}
      <Route path="/citas/historial/:id" element={<Layout><HistorialCitasPage showForSpecificCita={true} /></Layout>} />
    </Routes>
  );
};

export default AppRouter;