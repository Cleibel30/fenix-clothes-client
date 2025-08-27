import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer>
            <div className="container-fluid width h-100 d-flex align-items-center gap-5 p-5">
                <div className="row w-100 h-100">
                    <div className="col-md-4 col-sm-12 d-flex flex-column gap-3 h-100">
                        <h2 className='color text-center'>Fenix Cloths</h2>
                        <ul className="icons d-flex gap-3 justify-content-center">

                            <li><Link target='_blank' to="https://www.instagram.com/fenix_clothes_ca/"><i class="fs-2 text-light fa-brands fa-instagram"></i></Link></li>
                            <li><Link target='_blank' to="https://www.tiktok.com/@fnix.clothes?_t=ZM-8zBdLUrZ0Ny&_r=1"><i class="fs-2 text-light fa-brands fa-tiktok"></i></Link></li>
                            <li><Link target='_blank' to={`https://api.whatsapp.com/send?phone=4163038585&text=`}><i class="fs-2 text-light fa-brands fa-whatsapp"></i></Link></li>

                        </ul>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex flex-column gap-3 h-100">
                        <h2 className='text-center'>Políticas</h2>
                        <ul className='p-0 mx-auto'>
                            <li>
                                <Link to="" className='item-link text-decoration-none'>Política de Devoluciones</Link>
                            </li>
                            <li>
                                <Link to="" className='item-link text-decoration-none'>Política de Envío</Link>
                            </li>
                            <li>
                                <Link to="" className='item-link text-decoration-none'>Política de Privacidad</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex flex-column gap-3 h-100">
                        <h2 className='text-end text-center'>Contáctanos</h2>
                        <ul className='p-0 text-center'>
                            <li>
                                <p className='item-link text-decoration-none  text-end'>fenixclothes18@gmail.com</p>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
