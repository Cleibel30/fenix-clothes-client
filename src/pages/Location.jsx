import { Map } from "../components/Map"
import { Link } from "react-router-dom"

export const Location = () => {
    return (
        <>
            <div className="container marginTop">
                <h1 className="nav_font">Ubicación📍.</h1>
                <p className='nav_font fs-6'>Estamos ubicados en el Centro Comercial Ciudad Morichal en la Calle Negra Matea, dentro de la Urbanización Morichal, en el Municipio Ribas, ciudad de La Victoria, Estado Aragua. <Link target="_blank" to="https://www.google.com/maps/place/C.+C.+City+Morichal/@10.226254,-67.3117505,14.41z/data=!4m6!3m5!1s0x8c2a9e9c79b32633:0xf92875a464a1a449!8m2!3d10.2285887!4d-67.316548!16s%2Fg%2F1xgzctyf?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D" className="ms-1 fs-6 btn btn-primary">Ver en Google Maps <i class="fa-solid fa-location-dot"></i></Link></p>
            </div>
            <Map />
        </>
    )
}
