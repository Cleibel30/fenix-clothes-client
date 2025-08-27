import "../styles/form.css"
import { ButtonForm } from '../components/ButtonForm';
import { InputForm } from '../components/InputForm';
import { useForm } from '../hooks/useForm';
import { useValidateForm } from '../hooks/useValidateForm';
import { GoogleUser } from '../components/GoogleUser';
import { useSesion } from '../services/useSesion';
import { useEffect, useState } from "react";
import { RecoverCont } from "../components/RecoverCont"
import { Link } from "react-router-dom";

export const Sesion = () => {

    //Respuesta del service del loogin
    const [responseApi, setresponseApi] = useState(undefined)

    //Respuesta del service de envio de correo de recuperacion
    const [responseApiRecover, setresponseApiRecover] = useState(undefined)

    //Valor del boton del formulario button
    const [buttonValue, setButtonValue] = useState('Registrar')

    //Importacion del objeto del formulario y la funcion de tecleado del input
    const { formState, onInputChange } = useForm({ pass: "", email: "" })

    //Validacion de email y password
    const { errorEmail, errorPass, validateSesion } = useValidateForm()

    //Estado de envio de email de recuperacion cuando el email tiene el formato correcto
    const [activeEmail, setactiveEmail] = useState(false)

    //Funciones del inicio de sesion y envio de email de recuperacion
    const { startSesion, codeRecover } = useSesion()

    //Funcion de envio del formulario
    const submit = (e) => {
        e.preventDefault()
        const responseValidate = validateSesion(formState)

        if (!responseValidate) return

        startSesion(formState.email, formState.pass, setresponseApi)
        setButtonValue(<div class="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>)
    }

    //Funcion de validacion de datos para llamar a la funcion de correo de recuperacion
    const recoverPass = () => {
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailRegex.test(formState.email)) {
            setactiveEmail(true)
            setButtonValue(<div class="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>)
            codeRecover(formState.email, setresponseApiRecover)
        }
    }

    //Funcion cuando el inicio de sesion es correcto
    useEffect(() => {
        setButtonValue('Iniciar Sesión')
        if (responseApi && responseApi.success) {
            window.location.href = '/';
        }
    }, [responseApi])


    return (
        <>
            <div className="container-fluid back-form">
                <div className="row">
                    <img src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='banner img-fluid col-sm-12 col-md-12 col-lg-6 p-0' alt="" />
                    <div className="col-sm-12 col-md-12 col-lg-6 p-5 form-cont">
                        <form action="" className='mt-2' onSubmit={submit}>

                            <h1 className='mb-4 fw-bold text-light fs-2 d-flex flex-wrap gap-3 align-items-center'><span>Iniciar Sesión</span> <Link to="/" className=" nav_font fs-4 fw-bold p-2 bg-light rounded transparent">Style Ray</Link></h1>
                            <GoogleUser></GoogleUser>

                            <InputForm label='Correo Electrónico' placeholder='Ingresar Correo Electrónico' name='email' icon={<i className="fa-solid fa-envelope text-light fs-5 icon"></i>} type='email' onInputChange={onInputChange} value={formState.email} />

                            {errorEmail && <p className='text-light bg-danger p-2 rounded-2 mt-1'>Escribe un correo válido.</p>}

                            <InputForm label='Contraseña' placeholder='Ingresar la contraseña' name='pass' icon={<i className="fa-solid fa-lock text-light fs-5 icon"></i>} type='password' onInputChange={onInputChange} value={formState.pass} />

                            {errorPass && <p className='text-light bg-danger p-2 rounded-2 mt-1'>La contraseña debe tener mínimo 6 caracteres y máximo 20, debe tener mínimo una minúscula y una mayúscula.</p>}
                            {(responseApi && !(responseApi["success"])) && <p className='text-light bg-danger p-2 rounded-2 mt-1'>{responseApi.message}</p>}
                            {(responseApiRecover && !(responseApiRecover["success"])) && <p className='text-light bg-danger p-2 rounded-2 mt-1'>{responseApiRecover.message}</p>}
                            <ButtonForm value={buttonValue} />
                            <p className='text-light mt-3'>¿No tienes cuenta? <a href="/registrar" className='text-decoration-none text-light fw-bold'>Regístrate</a></p>
                            <p className='text-light mt-3'>¿Se te olvidó la contraseña? <button onClick={recoverPass} type="button" className='p-0 button text-decoration-none text-light fw-bold'>Cambia la contraseña</button></p>
                        </form>
                    </div>
                    {(responseApiRecover && responseApiRecover.success && setactiveEmail) && <RecoverCont email={formState.email} />}

                </div>
            </div>
        </>
    )
}
