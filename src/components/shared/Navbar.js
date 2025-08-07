import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/">Hospitech Services</Link>
            
            {user && (
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <span className="nav-link">
                            {user.username} ({user.rol})
                        </span>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-link nav-link" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;