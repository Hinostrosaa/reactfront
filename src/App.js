// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// FontAwesome Icons
import 'https://use.fontawesome.com/releases/v6.3.0/js/all.js';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;