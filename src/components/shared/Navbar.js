import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from 'react-bootstrap';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/">Hospitech Services</Link>
            
            {user && (
                <div className="ms-auto d-flex align-items-center">
                    <span className="text-light me-3">
                        {user.username} ({user.rol})
                    </span>
                    <Button 
                        variant="outline-light" 
                        size="sm"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;