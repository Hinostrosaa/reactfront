import React from 'react';
import ShowCms from './Cm/ShowCm';
import CompCreateCm from './Cm/CompCreateCm';
import CompEditCm from './Cm/EditCm';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// FontAwesome Icons
import 'https://use.fontawesome.com/releases/v6.3.0/js/all.js';

function App() {
  return (
    <BrowserRouter>
      <div className="sb-nav-fixed">
        {/* Top Navigation */}
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <Link className="navbar-brand ps-3" to="/">Hospitech Services</Link>
        </nav>

        <div id="layoutSidenav">
          {/* Sidebar Navigation */}
          <div id="layoutSidenav_nav" className="blue-strip">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <Link className="nav-link" to="/">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Inicio
                  </Link>

                  <Link className="nav-link" to="/">
                    <div className="sb-nav-link-icon"><i className="fas fa-user-injured"></i></div>
                    Pacientes
                  </Link>

                  <Link className="nav-link" to="/">
                    <div className="sb-nav-link-icon"><i className="fas fa-user-md"></i></div>
                    Médicos
                  </Link>

                  <Link className="nav-link" to="/">
                    <div className="sb-nav-link-icon"><i className="fas fa-calendar-check"></i></div>
                    Citas
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          <div id="layoutSidenav_content">
            {/* Main Content */}
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Gestión Hospitalaria</h1>
                
                {/* Content Routes */}
                <div className="card mb-4">
                  <div className="card-body">
                    <Routes>
                      <Route path="/" element={<ShowCms/>} />
                      <Route path="/create" element={<CompCreateCm />} />
                      <Route path="/edit/:tipo/:id" element={<CompEditCm />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; Hospitech 2023</div>
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