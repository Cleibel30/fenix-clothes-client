import React, { useEffect, useState } from 'react'
import { useVoucher } from '../services/useVoucher'
import { useRouteApi } from '../services/useRouteApi'


export const ShowVoucher = ({ setresponseApi, update, item, setactiveContent }) => {
    const { api } = useRouteApi()
    const { deleteVoucher } = useVoucher()
    const [valueButton, setvalueButton] = useState(undefined)
    const [responseDelete, setresponseDelete] = useState(undefined)

    const shadow = (e) => {
        if (e.target.className == 'buy') setactiveContent(false)
    }


    const changeDate = (date) => {
        const [year, day, month] = date.split("-")

        return `${day}-${month}-${year}`

    }

    useEffect(() => {
        if (responseDelete && responseDelete.success) {
            update(setresponseApi)
            setactiveContent(false)
        }
    }, [responseDelete])


    const deleteVoucherById = () => {
        deleteVoucher(setresponseDelete, item.voucher_id)
        setvalueButton(true)
    }


    return (
        <div className='buy' onClick={shadow}>
            <div className="container h-auto mt-5 bg-light rounded shadow-sm p-3">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <h3 className='nav_font fw-bold fs-4 mb-3 text-dark'>Comprobante de pago de {item.product.title}</h3>
                        <p><span className='fw-bold text-dark'>Fecha de subida:</span> <span className='text-dark'>{changeDate(item.date)}</span></p>
                        <p><span className='fw-bold text-dark'>Producto:</span> <span className='text-dark'>{item.product.title}</span></p>
                        <p><span className='fw-bold text-dark'>Cantidad comprada:</span> <span className='text-dark'>{item.quantity}</span></p>
                        <p><span className='fw-bold text-dark'>Talla:</span> <span className='text-dark'>{item.size}</span></p>
                        <p><span className='fw-bold text-dark'>Monto pagado:</span> <span className='text-dark'>Ref. {item.amount} - Bs. {(item.amount * item.dollar_rate).toFixed(2)}</span></p>
                        <p><span className='fw-bold text-dark'>Estado:</span> <span className='text-dark'>{item.check ? 'Aprobado' : 'Sin aprobar'}</span></p>
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12">
                        <img src={`${api}/api/images/get_image_voucher/${item.image_url}`} className='img-voucher w-100 rounded shadow-sm' alt="" />
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button className='bg-success p-2 rounded button text-light' onClick={() => setactiveContent(false)}>Cerrar</button>
                    <button className='bg-danger p-2 rounded button text-light' onClick={deleteVoucherById}>{valueButton ? 'Borrando comprobante...' : 'Borrar comprobante'}</button>
                </div>
            </div>
        </div>
    )
}

