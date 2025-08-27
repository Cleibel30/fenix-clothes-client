import "../styles/form.css"
import { ButtonForm } from '../components/ButtonForm';
import { InputForm } from '../components/InputForm';
import { useForm } from '../hooks/useForm';
import { useValidateForm } from '../hooks/useValidateForm';
import { useSesion } from '../services/useSesion';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const RecoverPass = () => {
    const [responseApi, setresponseApi] = useState(undefined)
    const [buttonValue, setButtonValue] = useState('Cambiar Contraseña')
    const { formState, onInputChange } = useForm({ pass: "", repeatPass: "" })
    const {errorPass, errorPassRepeat, validateRecoverPass } = useValidateForm()
    const {token} = useParams()

    const { recoverPass } = useSesion()

    const showPassword = (e) => {
        const input = e.target.parentNode.parentNode.children[2];

        if (input.type == 'password') {
            input.type = 'text'
        } else {
            input.type = 'password'
        }
    }



    const submit = (e) => {
        e.preventDefault()
        const responseValidate = validateRecoverPass(formState)

        if (!responseValidate) return

        recoverPass(formState.pass, formState.repeatPass, token, setresponseApi)
        setButtonValue(<div class="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>)
    }

    useEffect(() => {
        setButtonValue('Cambiar Contraseña')
        if (responseApi && responseApi.success) {
            window.location.href = '/sesion';
        }
    }, [responseApi])

    return (
        <>
            <div className="container-fluid back-form">
                <div className="row w-50 mx-auto">
                
                    <div className="col-sm-12 col-md-12 col-lg-12 p-5 form-cont">
                        <form action="" className='mt-2' onSubmit={submit}>
                            <h1 className='mb-4 fw-bold text-light fs-2'>Cambiar la Contraseña <a href="/" className="ms-2 nav_font fs-4 fw-bold p-2 bg-light rounded transparent">Style Ray</a></h1>

                            <InputForm label='Contraseña' placeholder='Ingresar la contraseña' name='pass' icon={<i className="fa-solid fa-lock text-light fs-5 icon"></i>} type='password' showPassword={showPassword} onInputChange={onInputChange} value={formState.pass} />

                            {errorPass && <p className='text-light bg-danger p-2 rounded-2 mt-1'>La contraseña debe tener mínimo 6 caracteres y máximo 20, debe tener mínimo una minúscula y una mayúscula.</p>}

                            <InputForm label='Contraseña' placeholder='Rpetir la contraseña' name='repeatPass' icon={<i className="fa-solid fa-lock text-light fs-5 icon"></i>} type='password' showPassword={showPassword} onInputChange={onInputChange} value={formState.repeatPass} />

                            {errorPassRepeat && <p className='text-light bg-danger p-2 rounded-2 mt-1'>La contraseña deben ser iguales.</p>}

                            {(responseApi && !(responseApi["success"])) && <p className='text-light bg-danger p-2 rounded-2 mt-1'>{responseApi.message}</p>}
                            <ButtonForm value={buttonValue} />
                            <p className='text-light mt-3'>¿No tienes cuenta? <a href="/registrar" className='text-decoration-none text-light fw-bold'>Regístrate</a></p>
                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}
