import React, { useEffect, useState } from 'react'
import { ButtonForm } from './ButtonForm'
import { Link } from 'react-router-dom'
import { useRegister } from '../services/useRegister'

export const Code = ({ name, pass, email, repeatPass, token }) => {
    const [responseApi, setresponseApi] = useState(undefined)
    const [responseEmail, setresponseEmail] = useState(undefined)
    const [buttonValue, setButtonValue] = useState('Enviar')
    const [codeValue, setcodeValue] = useState("")
    const [error, seterror] = useState(false)
    const { registerUser, codeRegister } = useRegister()

    const submit = (e) => {
        e.preventDefault()

        if (codeValue.length < 4) {
            seterror(true)
            return
        } else seterror(false)

        if(!responseEmail || !responseEmail.success) {
            registerUser(name, email, pass, repeatPass, codeValue, setresponseApi, token)
        }else registerUser(name, email, pass, repeatPass, codeValue, setresponseApi, responseEmail.data)

        setButtonValue(<div class="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>)
    }


    const reSend = () => {
        codeRegister(email, setresponseEmail)
        setButtonValue(<div class="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>)
    }

    useEffect(() => {
        setButtonValue('Enviar')

        if(responseApi&& responseApi.success) window.location.replace("/");
        
    }, [responseApi, responseEmail])


    return (
        <>
            <div className=" back-form code">
                <form action="" className='w-25 mt-5' onSubmit={submit}>
                    <h3 className='fw-bold text-light'>Código de confirmación</h3>
                    <p className='text-light'>Enviado al correo: <b>{email}</b></p>
                    <div class="mb-3">
                        <label htmlFor="code" className="form-label text-light">Ingresar código de verificación</label>
                        <input type="text" maxLength="4" className="form-control" id="code" value={codeValue} onChange={(e) => setcodeValue(e.target.value)} />
                    </div>

                    {error && <p className='text-light bg-danger p-2 rounded-2 mt-1'>El código tiene mínimo 4 caracteres.</p>}

                    {(responseApi && !(responseApi["success"])) && <p className='text-light bg-danger p-2 rounded-2 mt-1'>{responseApi.message}</p>}

                    <div className="btn p-0">
                        <Link to="" className='text-light me-4' onClick={reSend}>Reenviar</Link>
                        <Link to="/" className='text-light'>Cancelar</Link>
                    </div>
                    <ButtonForm value={buttonValue} />
                </form>
            </div>
        </>
    )
}
