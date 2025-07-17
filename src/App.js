import React from 'react';
import CompShowCms from './Cm/ShowCm';
import CompCreateCm from './Cm/CreateCm';
import CompEditCm from './Cm/EditCm';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Icons

function App() {
  return (
    <BrowserRouter>
      <div className="sb-nav-fixed">
        {/* Top Navigation */}
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* Navbar Brand */}
          <Link className="navbar-brand ps-3" to="/">Hospitech Services</Link>
          
          {/* Sidebar Toggle */}
          <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
            <i className="bi bi-list"></i>
          </button>
          
          {/* Navbar Search */}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Buscar..." aria-label="Search" />
              <button className="btn btn-primary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
          
          {/* Navbar */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" 
              id="navbarDropdown" href="#" role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
                <i className="bi bi-person"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="#!">Configuración</Link></li>
                <li><Link className="dropdown-item" to="#!">Registro de actividad</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#!">Cerrar sesión</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Inicio</div>
                  {/*categorias de inicio, se podria eliminar si no habria un uso necesario */}

                  <Link className="nav-link" to="/">
                    <div className="sb-nav-link-icon">
                      <i className="bi bi-speedometer2"></i>
                    </div>
                    
                  </Link>
                  
                  <div className="sb-sidenav-menu-heading">Citas</div>
                  <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    {/*categorias de Citas, se tiene que impleementar una barra de opciones */}
                    <div className="sb-nav-link-icon">
                      <i className="bi bi-layout-three-columns"></i>
                    </div>
                    
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="bi bi-chevron-down"></i>
                    </div>
                  </div>

                  <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" to="/">Ver Citas</Link>
                      <Link className="nav-link" to="/create">Nueva Cita</Link>
                    </nav>
                  </div>
                  
                  <div className="sb-sidenav-menu-heading">Medicos</div>

                  {/*<Link className="nav-link" to="#">
                    <div className="sb-nav-link-icon">
                      <i className="bi bi-bar-chart"></i>
                    </div>
                    Gráficos
                  </Link>
                  <Link className="nav-link" to="#">
                    <div className="sb-nav-link-icon">
                      <i className="bi bi-table"></i>
                    </div>
                    Tablas
                  </Link>*/}

                </div>
              </div>
              {/*<div className="sb-sidenav-footer">
                <div className="small">Conectado como:</div>
                Administrador
              </div>*/}
            </nav>
          </div>

          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Informe</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active"></li>
                </ol>
                
                {/* Content Routes */}
                <div className="card mb-4">
                  <div className="card-body">
                    <Routes>
                      <Route path="/" element={<CompShowCms />} />
                      <Route path="/create" element={<CompCreateCm />} />
                      <Route path="/edit/:tipo/:id" element={<CompEditCm />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </main>
            
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; Sistema de Citas Médicas {new Date().getFullYear()}</div>
                  <div>
                    <Link to="#">Política de Privacidad</Link>
                    &middot;
                    <Link to="#">Términos &amp; Condiciones</Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;