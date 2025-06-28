import logo from './logo.svg';
import './App.css';
//importamos componentes
import CompShowCms from './Cm/ShowCm';
import CompCreateCm from './Cm/CreateCm';

//importamos los modulos de react-router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompEditCm from './Cm/EditCm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompShowCms />}/>
          <Route path='/create' element={<CompCreateCm />}/>
          <Route path='/edit/:id_paciente' element={<CompEditCm />}/>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
