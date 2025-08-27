import { Link } from "react-router-dom"

export const RecoverCont = ({ email }) => {
    
    return (
        <div className='back-form code'>
            <div className="">
                <h3 className='mb-4 fw-bold text-light fs-2 d-flex flex-wrap gap-3 align-items-center mt-5'><span>Enlace de cambio de contraseña</span> <a href="/" className=" nav_font fs-4 fw-bold p-2 bg-light rounded transparent">Style Ray</a></h3>
                
                <p className='text-light fs-4 mt-3'>Revisa tu correo <b>{email}</b> y accede al enlace</p>
                <p className='text-light mt-3'>¿No tienes cuenta? <Link to="/registrar" className='text-decoration-none text-light fw-bold'>Regístrate</Link></p>
                <p className='text-light mt-3'>¿Recordaste tu contraseña? <Link to="/sesion" className='text-decoration-none text-light fw-bold'>Regresar</Link></p>
            </div>
        </div>
    )
}
