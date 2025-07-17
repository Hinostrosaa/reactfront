import { useState } from "react";

const CreateMedico = ({ onChange }) => {
    const [especialidad, setEspecialidad] = useState('');
    const [años_experiencia, setAños_experiencia] = useState('');

    return (
        <>
            <div className='mb-3'>
                <label className='form-label'>Especialidad</label>
                <input 
                    value={especialidad} 
                    onChange={(e) => { 
                        setEspecialidad(e.target.value);
                        onChange('especialidad', e.target.value);
                    }}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Años de Experiencia</label>
                <input 
                    value={años_experiencia} 
                    onChange={(e) => { 
                        setAños_experiencia(e.target.value);
                        onChange('años_experiencia', e.target.value);
                    }}
                    type='number'
                    className='form-control'
                />
            </div>
        </>
    );
};

export default CreateMedico;
