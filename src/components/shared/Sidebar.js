import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaHome, 
    FaUserInjured, 
    FaUserMd, 
    FaCalendarAlt, 
    FaHistory, 
    FaUserCog 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <div id="layoutSidenav_nav" className="blue-strip">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <Link className="nav-link" to="/">
                            <div className="sb-nav-link-icon"><FaHome /></div>
                            Inicio
                        </Link>
                        
                        {user && (user.rol === 'administrador' || user.rol === 'recepcionista') && (
                            <>
                                <Link className="nav-link" to="/pacientes">
                                    <div className="sb-nav-link-icon"><FaUserInjured /></div>
                                    Pacientes
                                </Link>
                                
                                <Link className="nav-link" to="/medicos">
                                    <div className="sb-nav-link-icon"><FaUserMd /></div>
                                    Médicos
                                </Link>
                                
                                <Link className="nav-link" to="/citas">
                                    <div className="sb-nav-link-icon"><FaCalendarAlt /></div>
                                    Citas
                                </Link>
                            </>
                        )}
                        
                        {user && user.rol === 'administrador' && (
                            <Link className="nav-link" to="/usuarios">
                                <div className="sb-nav-link-icon"><FaUserCog /></div>
                                Usuarios
                            </Link>
                        )}
                        
                        <Link className="nav-link" to="/historial-citas">
                            <div className="sb-nav-link-icon"><FaHistory /></div>
                            Historial de Citas
                        </Link>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    {user && (
                        <div className="small">
                            Conectado como: {user.username} ({user.rol})
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;