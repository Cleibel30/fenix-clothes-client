import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useService } from '../services/useServices'
import { SliderProduct } from '../components/SliderProduct'
import { useDolar } from "../services/useDolar"
import { ButtonForm } from "../components/ButtonForm"

export const ShowService = () => {
    const [responseApi, setresponseApi] = useState(undefined)
    const { service_id } = useParams()
    const [dolar, setdolar] = useState(undefined)
    const { getDolar } = useDolar()
    const { getServiceById } = useService()


    useEffect(() => {
        getDolar(setdolar)
        getServiceById(setresponseApi, service_id)
    }, [])



    return (
        <>
            <div className="container marginTop bg-light rounded shadow-sm p-4 cont-show-product">
                <div className="row row-gap-2">
                    <div className="col-md-12 col-sm-12 col-lg-8 p-0 pe-lg-2">
                        {(responseApi && responseApi.success) && <SliderProduct images={responseApi.data.images} service={true} />}
                    </div>
                    <div className="col-md-12 col-sm-12 col-lg-4 p-4 shadow rounded border">                       
                        <h3 className="fs-3 fw-bold nav_font w-75">{(responseApi && responseApi.success) ? responseApi.data.service.title : <p className="placeholder-glow"> <span className="placeholder col-12"></span> </p>}</h3>

                        {(responseApi && responseApi.success) ? (
                            <p className="shadow rounded-2 p-2 fw-bolder fs-5">Ref. {responseApi.data.service.price} - Bs. {(responseApi.data.service.price * dolar).toFixed(2)}</p>
                        ) : <p className="placeholder-glow"> <span className="placeholder col-12"></span> </p>}

                        <p className="p-description">{(responseApi && responseApi.success) ? responseApi.data.service.description : (
                            <>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder w-75"></span>
                                <span className="placeholder" style={{ width: "25%" }}></span>
                            </>
                        )}</p>

                        <ButtonForm value={<span>Acordar cita <i class="fa-brands fa-rocketchat ms-1"></i></span>} />

                    </div>
                </div>
            </div>

        </>
    )
}
