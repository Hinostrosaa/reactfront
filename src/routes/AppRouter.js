import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
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

const PrivateRoute = ({ children, requiredRoles = [] }) => {
    const { isAuthenticated, user, loading } = useAuth();
    
    if (loading) {
        return <div className="text-center mt-5"><p>Cargando...</p></div>;
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.rol)) {
        return <Navigate to="/" />;
    }
    
    return children;
};

const AppRouter = () => {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Rutas privadas */}
            <Route path="/" element={
                <PrivateRoute>
                    <Layout><Home /></Layout>
                </PrivateRoute>
            } />
            
            <Route path="/pacientes" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><PacientesPage /></Layout>
                </PrivateRoute>
            } />
            <Route path="/pacientes/create" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><CreatePaciente /></Layout>
                </PrivateRoute>
            } />
            <Route path="/pacientes/edit/:id" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><EditPaciente /></Layout>
                </PrivateRoute>
            } />
            
            <Route path="/medicos" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><MedicosPage /></Layout>
                </PrivateRoute>
            } />
            <Route path="/medicos/create" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><CreateMedico /></Layout>
                </PrivateRoute>
            } />
            <Route path="/medicos/edit/:id" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><EditMedico /></Layout>
                </PrivateRoute>
            } />
            
            <Route path="/citas" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><CitasPage /></Layout>
                </PrivateRoute>
            } />
            <Route path="/citas/create" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><CreateCita /></Layout>
                </PrivateRoute>
            } />
            <Route path="/citas/edit/:id" element={
                <PrivateRoute requiredRoles={['administrador', 'recepcionista']}>
                    <Layout><EditCita /></Layout>
                </PrivateRoute>
            } />
            
            <Route path="/historial-citas" element={
                <PrivateRoute>
                    <Layout><HistorialCitasPage /></Layout>
                </PrivateRoute>
            } />
            <Route path="/historial-citas/:id" element={
                <PrivateRoute>
                    <Layout><DetalleHistorialPage /></Layout>
                </PrivateRoute>
            } />
            
            <Route path="/citas/historial/:id" element={
                <PrivateRoute>
                    <Layout><HistorialCitasPage showForSpecificCita={true} /></Layout>
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default AppRouter;