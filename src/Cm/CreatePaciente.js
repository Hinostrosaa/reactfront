import { useState } from "react";

const CreatePaciente = ({ onChange }) => {
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [correo_electronico, setCorreo_electronico] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    return (
        <>
            <div className='mb-3'>
                <label className='form-label'>Fecha de Nacimiento</label>
                <input 
                    value={fecha_nacimiento} 
                    onChange={(e) => { 
                        setFecha_nacimiento(e.target.value);
                        onChange('fecha_nacimiento', e.target.value);
                    }}
                    type='date'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Correo Electrónico</label>
                <input 
                    value={correo_electronico} 
                    onChange={(e) => { 
                        setCorreo_electronico(e.target.value);
                        onChange('correo_electronico', e.target.value);
                    }}
                    type='email'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Teléfono</label>
                <input 
                    value={telefono} 
                    onChange={(e) => { 
                        setTelefono(e.target.value);
                        onChange('telefono', e.target.value);
                    }}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Dirección</label>
                <input 
                    value={direccion} 
                    onChange={(e) => { 
                        setDireccion(e.target.value);
                        onChange('direccion', e.target.value);
                    }}
                    type='text'
                    className='form-control'
                />
            </div>
        </>
    );
};

export default CreatePaciente;
