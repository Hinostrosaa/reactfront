import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/Cms/'

const CompCreateCm = () => {
    const [nombre, setNombre] = useState('')
    const [dni, setDni] = useState('')
    const [fecha_nacimiento, setFecha_nacimiento] = useState('')
    const [correo_electronico, setCorreo_electronico] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {
            nombre: nombre,
            dni: dni,
            fecha_nacimiento: fecha_nacimiento,
            correo_electronico: correo_electronico,
            telefono: telefono,
            direccion: direccion
        }, navigate('/'))
    }

    return(
        <div>
            <h3>Create Post</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div>
                    <label className='form-label'>DNI</label>
                    <input 
                        value={dni} 
                        onChange={(e) => setDni(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div>
                    <label className='form-label'>Fecha de Nacimiento</label>
                    <input 
                        value={fecha_nacimiento} 
                        onChange={(e) => setFecha_nacimiento(e.target.value)}
                        type='date'
                        className='form-control'
                    />
                </div>
                <div>
                    <label className='form-label'>Correo Electronico</label>
                    <input 
                        value={correo_electronico} 
                        onChange={(e) => setCorreo_electronico(e.target.value)}
                        type='email'
                        className='form-control'
                    />
                </div>
                <div>
                    <label className='form-label'>Telefono</label>
                    <input 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div>
                    <label className='form-label'>Direccion</label>
                    <input 
                        value={direccion} 
                        onChange={(e) => setDireccion(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary mt-2'>Store</button>
            </form>
        </div>
        )
    }

export default CompCreateCm