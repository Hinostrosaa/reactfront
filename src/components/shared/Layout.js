// src/components/shared/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Mapeo de títulos según la ruta
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/pacientes')) return 'Gestión de Pacientes';
    if (path.startsWith('/medicos')) return 'Gestión de Médicos';
    if (path.startsWith('/citas')) return 'Gestión de Citas';
    if (path.startsWith('/historial-citas')) return 'Historial de Citas';
    return 'Gestión Hospitalaria'; // Título por defecto
  };

  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">{getPageTitle()}</h1>
              <div className="card mb-4">
                <div className="card-body">
                  {children}
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Hospitech {new Date().getFullYear()}</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;