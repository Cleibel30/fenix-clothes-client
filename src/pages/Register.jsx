import "../styles/form.css"
import { ButtonForm } from '../components/ButtonForm';
import { InputForm } from '../components/InputForm';
import { useForm } from '../hooks/useForm';
import { useValidateForm } from '../hooks/useValidateForm';
import { Code } from '../components/Code';
import { useRegister } from '../services/useRegister';
import { GoogleUser } from '../components/GoogleUser';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Register = () => {
    const [responseApi, setresponseApi] = useState(undefined)
    const [buttonValue, setButtonValue] = useState('Registrar')
    const { formState, onInputChange } = useForm({ name: "", email: "", pass: "", repeatPass: "" })
    const { errorName, errorEmail, errorPass, errorPassRepeat, validateRegister } = useValidateForm()
    const { codeRegister } = useRegister()


    const submit = (e) => {
        e.preventDefault()
        const responseValidate = validateRegister(formState)

        if (!responseValidate) return

        setButtonValue(<div class="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>)
        codeRegister(formState.email, setresponseApi)
    }

    useEffect(() => {
        setButtonValue('Registrar')
    }, [responseApi])


    return (
        <>
            <div className="container-fluid back-form">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-7 p-5 form-cont">
                        <form action="" className='mt-2' onSubmit={submit}>
                            <h1 className='mb-4 fw-bold text-light fs-2 d-flex flex-wrap gap-3 align-items-center'><span>Registrarse</span> <Link to="/" className=" nav_font fs-4 fw-bold p-2 bg-light rounded transparent">Style Ray</Link></h1>
                            
                            <GoogleUser></GoogleUser>

                            <InputForm label='Nombre de Usuario' placeholder='Ingresar Nombre de Usuario' name='name' icon={<i className="fa-solid fa-user text-light fs-5 icon"></i>} type='text' onInputChange={onInputChange} value={formState.name} />

                            {errorName && <p className='text-light bg-danger p-2 rounded-2 mt-1'>EL nombre debe tener mínimo 3 caracteres y máximo 50.</p>}

                            <InputForm label='Correo Electrónico' placeholder='Ingresar Correo Electrónico' name='email' icon={<i className="fa-solid fa-envelope text-light fs-5 icon"></i>} type='email' onInputChange={onInputChange} value={formState.email} />

                            {errorEmail && <p className='text-light bg-danger p-2 rounded-2 mt-1'>Escribe un correo válido.</p>}

                            <div className="container-fluid p-0">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-6"><InputForm label='Contraseña' placeholder='Ingresar la contraseña' name='pass' icon={<i className="fa-solid fa-lock text-light fs-5 icon"></i>} type='password' onInputChange={onInputChange} value={formState.pass} /></div>
                                    <div className="col-sm-12 col-md-12 col-lg-6"><InputForm label='Repite la Contraseña' placeholder='Repetir la contraseña' name='repeatPass' icon={<i className="fa-solid fa-lock text-light fs-5 icon"></i>} type='password' onInputChange={onInputChange} value={formState.repeatPass} /></div>
                                </div>
                            </div>



                            {errorPass && <p className='text-light bg-danger p-2 rounded-2 mt-2'>La contraseña debe tener mínimo 6 caracteres y máximo 20, debe tener mínimo una minúscula y una mayúscula.</p>}

                            {errorPassRepeat && <p className='text-light bg-danger p-2 rounded-2 mt-1'>Las contraseñas deben ser iguales.</p>}

                            {(responseApi && !(responseApi["success"])) && <p className='text-light bg-danger p-2 rounded-2 mt-1'>{responseApi.message}</p>}

                            <ButtonForm value={buttonValue} />
                            <p className='text-light mt-3'>¿Ya tienes cuenta? <a href="/sesion" className='text-decoration-none text-light fw-bold'>Inicia Sesión</a></p>
                        </form>
                    </div>
                    <img src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='banner img-fluid col-sm-12 col-md-12 col-lg-5 p-0' alt="" />

                </div>
            </div>

            {(responseApi && responseApi["success"]) && (
                <Code email={formState.email} pass={formState.pass} name={formState.name} repeatPass={formState.repeatPass} token={responseApi.data} />
            )}
        </>
    )
}
