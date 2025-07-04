import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:8000/Cms/'

const CompShowCms = () => {

    const [cms, setCms] = useState([])
    useEffect ( () =>{
        getCms()
    },[])

    //procedimientos para mostrar los datos
    const getCms = async () => {
        const res = await axios.get(URI)
        setCms(res.data)

    }

    //procedimientos para eliminar un dato 
    const deleteCm = async (id_paciente) => {
        await axios.delete(`${URI}${id_paciente}`)
        getCms()

    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fa-solid fa-plus"></i></Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Dni</th>
                                <th scope='col'>Fecha de Nacimiento</th>
                                <th scope='col'>Correo Electronico</th>
                                <th scope='col'>Telefono</th>
                                <th scope='col'>Direccion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cms.map((cm) => (
                                    <tr key={cm.id_paciente}>
                                        <td>{cm.nombre}</td>
                                        <td>{cm.dni}</td>
                                        <td>{cm.fecha_nacimiento}</td>
                                        <td>{cm.correo_electronico}</td>
                                        <td>{cm.telefono}</td>
                                        <td>{cm.direccion}</td>
                                        <td>
                                            <Link to={`/edit/${cm.id_paciente}`} className='btn btn-warning'><i className="fa-solid fa-pen-to-square"></i></Link>
                                            <button onClick={() => deleteCm(cm.id_paciente)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

    
}
export default CompShowCms;