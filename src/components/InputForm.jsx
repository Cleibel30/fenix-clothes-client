import React from 'react'

export const InputForm = ({label, placeholder, name, icon, type, onInputChange, value}) => {

     //Funcion de ver contraseña 
    const showPassword = (e) => {
        const input = e.target.parentNode.parentNode.children[2];

        if (input.type == 'password') {
            input.type = 'text'
        } else {
            input.type = 'password'
        }
    }

    return (
        <div className="input-cont mt-4">
            <label htmlFor="name" className='fs-6 text-light label'>{label}</label>
            {icon}
            <input type={type} id={name} className='input' placeholder={placeholder} onChange={onInputChange} name={name}  value={value}/>
            {type == "password" && <button className='show' type='button' onClick={showPassword}><i className="fa-solid fa-eye text-light fs-5"></i></button>}
        </div>
    )
}
