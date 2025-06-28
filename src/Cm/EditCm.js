import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/Cms/'

const CompEditCm = () => {
    const [nombre, setNombre] = useState('')
    const [dni, setDni] = useState('')
    const [fecha_nacimiento, setFecha_nacimiento] = useState('')
    const [correo_electronico, setCorreo_electronico] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const navigate = useNavigate()
    const {id_paciente} = useParams()

    //procedimiento para actualizar los datos
    const update = async (e) => {
        e.preventDefault();
        await axios.put(URI+id_paciente, {
            nombre: nombre,
            dni: dni,
            fecha_nacimiento: fecha_nacimiento,
            correo_electronico: correo_electronico,
            telefono: telefono,
            direccion: direccion
        })
        navigate('/')
    }
    //procedimiento para obtener los datos
    useEffect(() => {
        getCmById()
    },[])

    const getCmById = async () => {
        const res = await axios.get(URI+id_paciente)
        setNombre(res.data.nombre)
        setDni(res.data.dni)
        setFecha_nacimiento(res.data.fecha_nacimiento)
        setCorreo_electronico(res.data.correo_electronico)
        setTelefono(res.data.telefono)
        setDireccion(res.data.direccion)
    }
    return (
        <div>
            <h3>Edit Post</h3>
            <form onSubmit={update}>
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

export default CompEditCm;