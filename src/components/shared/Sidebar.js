// src/components/shared/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav" className="blue-strip">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <Link className="nav-link" to="/">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Inicio
            </Link>
            <Link className="nav-link" to="/pacientes">
              <div className="sb-nav-link-icon"><i className="fas fa-user-injured"></i></div>
              Pacientes
            </Link>
            <Link className="nav-link" to="/medicos">
              <div className="sb-nav-link-icon"><i className="fas fa-user-md"></i></div>
              Médicos
            </Link>
            <Link className="nav-link" to="/citas">
              <div className="sb-nav-link-icon"><i className="fas fa-calendar-check"></i></div>
              Citas
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;