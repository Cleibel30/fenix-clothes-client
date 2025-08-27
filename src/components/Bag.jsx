import React, { useEffect, useRef } from 'react'
import { useFunctionEffects } from '../hooks/useFunctionEffects'
import { useBag } from '../services/useBag'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export const Bag = ({ responseApi }) => {

    const { closedBag } = useFunctionEffects()

    const bagContent = useRef()

    return (
        <>
            <div className="shadow shadow-bag" onClick={closedBag}></div>
            <div className="bag-container" ref={bagContent}>
                <button className='button closed' onClick={closedBag}><i class="fa-solid fa-xmark fs-1"></i></button>
                <h2 className='text-dark cesta'>Cesta</h2>
                <div className="container d-flex align-items-center flex-column gap-2 py-3 h-100">
                    {responseApi && !responseApi.success && <p className='text-dark special fs-4'>Sin contenido</p>}
                    <div className="container-fluid">

                        {responseApi && responseApi.success && (
                            responseApi.data.map(item => (
                                <Link to={`/producto/${item.product.product_id}`} className='text-decoration-none'>
                                    <div className="row mb-3">
                                        <div className="col-lg-4 col-md-12 col-sm-12">
                                            <img className='w-100 h-bag' src={`http://localhost:3000/api/images/get_image/${item.product.images[0].image_url}`} alt="" />
                                        </div>
                                        <div className="col-lg-8 col-md-12 col-sm-12">
                                            <p className='text-dark fw-bold min-size'>{item.product.title} </p>
                                            <p className='text-dark min-size'>Ref. {item.product.price}  - Bs. {(parseFloat(item.product.price) * 142).toFixed(2)}</p>
                                            <p className='text-dark min-size p-1 rounded shadow-sm d-inline-block'>Cantidad: {item.quantity}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
