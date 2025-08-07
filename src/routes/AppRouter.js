// src/routes/AppRouter.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import Login from '../components/auth/Login';

// Componente para rutas protegidas
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    // Verificar roles si se especifican
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

const AppRouter = () => {
    return (
        <Routes>
            {/* Ruta de login (sin layout) */}
            <Route path="/login" element={<Login />} />
            
            {/* Ruta principal */}
            <Route path="/" element={
                <ProtectedRoute>
                    <Layout><Home /></Layout>
                </ProtectedRoute>
            } />
            
            {/* Rutas de Pacientes */}
            <Route path="/pacientes" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista']}>
                    <Layout><PacientesPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/pacientes/create" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista']}>
                    <Layout><CreatePaciente /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/pacientes/edit/:id" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista']}>
                    <Layout><EditPaciente /></Layout>
                </ProtectedRoute>
            } />
            
            {/* Rutas de Médicos */}
            <Route path="/medicos" element={
                <ProtectedRoute allowedRoles={['administrador']}>
                    <Layout><MedicosPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/medicos/create" element={
                <ProtectedRoute allowedRoles={['administrador']}>
                    <Layout><CreateMedico /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/medicos/edit/:id" element={
                <ProtectedRoute allowedRoles={['administrador']}>
                    <Layout><EditMedico /></Layout>
                </ProtectedRoute>
            } />
            
            {/* Rutas de Citas */}
            <Route path="/citas" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista', 'medico']}>
                    <Layout><CitasPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/citas/create" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista']}>
                    <Layout><CreateCita /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/citas/edit/:id" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista']}>
                    <Layout><EditCita /></Layout>
                </ProtectedRoute>
            } />
            
            {/* Rutas de Historial de Citas */}
            <Route path="/historial-citas" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista']}>
                    <Layout><HistorialCitasPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/historial-citas/:id" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista', 'medico']}>
                    <Layout><DetalleHistorialPage /></Layout>
                </ProtectedRoute>
            } />
            
            {/* Ruta para ver historial de una cita específica */}
            <Route path="/citas/historial/:id" element={
                <ProtectedRoute allowedRoles={['administrador', 'recepcionista', 'medico']}>
                    <Layout><HistorialCitasPage showForSpecificCita={true} /></Layout>
                </ProtectedRoute>
            } />
            
            {/* Redirección para rutas no encontradas */}
            <Route path="*" element={
                <Navigate to="/" replace />
            } />
        </Routes>
    );
};

export default AppRouter;