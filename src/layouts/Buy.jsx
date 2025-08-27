import React, { useEffect, useState } from 'react'
import { useVoucher } from '../services/useVoucher'
import { useData } from '../services/useData'


export const Buy = ({ setresponseApiBuy, amount, dolar, quantity, price, product_id, setactiveAlert, size }) => {
    
    const [responseApi, setresponseApi] = useState(undefined)
    const { getData } = useData()

    const [preview, setPreview] = useState(undefined)
    const [file, setFile] = useState(undefined)
    const [error, seterror] = useState(false)
    const [formData, setformData] = useState(undefined)
    const [sendInfo, setsendInfo] = useState(undefined)
    const [sendImg, setsendImg] = useState(undefined)

    const { sendVoucherInfo, sendVoucherImg } = useVoucher()

    useEffect(() => {
      getData(setresponseApi)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file && preview && quantity && amount && dolar) {
            const formDataInfo = new FormData();
            formDataInfo.append('image', file);
            setformData(formDataInfo)

            sendVoucherInfo(setsendInfo, product_id, quantity, amount, dolar, size)

            seterror(false)
        } else seterror(true)
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const shadow = (e) => {
        if (e.target.className == 'buy') setresponseApiBuy(undefined)
    }

    useEffect(() => {
        if(sendInfo && sendInfo.success && formData && preview){
            sendVoucherImg(setsendImg, sendInfo.data.voucher_id, formData)
        }
    }, [sendInfo])


    useEffect(() => {
        if(sendImg && sendInfo.success){
            setactiveAlert(true)
            setresponseApiBuy(undefined)
        }
    }, [sendImg])
    
    


    return (
        <div className='buy' onClick={shadow}>
            
            <div className="container h-auto mt-2 bg-light rounded shadow-sm">
                <div className="row">
                    <div className="col-6">
                        <h3 className='text-center py-3 nav_font fw-bold fs-4 text-dark'>Datos del pago móvil</h3>
                        
                        <ul className='p-0'>
                            <li className='fw-bold text-dark'>Teléfono: {(responseApi && responseApi.success) && responseApi.data.phone} </li>
                            <li className='fw-bold text-dark'>Cédula:  {(responseApi && responseApi.success) && responseApi.data.id}</li>
                            <li className='fw-bold text-dark'>Banco:  {(responseApi && responseApi.success) && responseApi.data.bank}</li>
                            <li className='fw-bold text-dark'>Talla: {size}</li>
                            <li className='fw-bold text-dark'>Cantidad a comprar: {quantity} {`(Precio c/u Ref. ${price} - Bs. ${(price * dolar).toFixed(2)})`}</li>
                            <li className='fw-bold text-dark'>Monto a pagar: Ref. {amount} - Bs. {(amount * dolar).toFixed(2)}</li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <form action="" onSubmit={handleSubmit} className='mx-auto d-flex justify-content-center flex-column'>

                            <div className="mt-3 d-flex justify-content-center w-100">
                                {!preview && (<p className="shadow-sm rounded example-img text-dark">Imágen de comprobante de pago</p>)}
                                {preview && (
                                    <img src={preview} alt="" className=' pe-2 rounded shadow-sm voucher' />
                                )}
                            </div>

                            <div className="d-flex flex-wrap mt-2 gap-2">
                                <label htmlFor="file" className='bg-primary p-2 rounded button'>Cargar comprobante de pago</label>
                                <input id='file' type="file" accept="image/*" className='d-none' onChange={handleFileChange} />
                                <button type='button' onClick={() => setPreview(undefined)} className='bg-primary p-2 rounded button text-light'>Borrar</button>
                                <p className='text-dark'>Nota: después de subir el comprobante se te enviará una notificación para que puedas buscar tu(s) productos al establecimiento. En el caso de algún problema se te notificará.</p>
                            </div>

                            {error && (
                                <p className='bg-danger text-light p-1 rounded-1'>Debes subir el comprabante</p>
                            )}

                            {(sendInfo && !sendInfo.success) && (
                                <p className='bg-danger text-light p-1 rounded-1'>{sendInfo.message}</p>
                            )}

                            {(sendImg && !sendImg.success) && (
                                <p className='bg-danger text-light p-1 rounded-1'>{sendImg.message}</p>
                            )}

                            <div className="d-flex justify-content-end my-2 gap-2">
                                <button className='bg-danger p-2 rounded button text-light' type='button' onClick={() => setresponseApiBuy(undefined)}>Cancelar</button>
                                <button className='bg-success p-2 rounded button text-light' type='submit'>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

