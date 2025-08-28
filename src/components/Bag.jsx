import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBagStore } from '../hooks/useBagStore'
import { useRouteApi } from '../services/useRouteApi'



export const Bag = ({ setactiveBag }) => {
    const { bolsa } = useBagStore()
    const { api } = useRouteApi()

    const closedBag = (event) => {
        setactiveBag(false)
    }

    const bagContent = useRef()

    return (
        <>
            <div className="shadow bag-active" onClick={closedBag}></div>
            <div className="bag-container bag-active" ref={bagContent}>
                <button className='button closed' onClick={closedBag}><i class="fa-solid fa-xmark fs-1"></i></button>
                <h2 className='text-dark cesta'>Cesta</h2>
                <div className="container d-flex align-items-center flex-column gap-2 py-3 h-100">
                    {bolsa.length == 0 && <p className='text-dark special fs-4'>Sin contenido</p>}
                    <div className="container-fluid">

                        {bolsa.length > 0 && (
                            bolsa.map(item => (
                                <Link to={`/producto/${item.product.product_id}`} className='text-decoration-none'>
                                    <div className="row mb-3">
                                        <div className="col-lg-4 col-md-12 col-sm-12">
                                            <img className='w-100 h-bag' src={`${api}/api/images/get_image/${item.images[0].image_url}`} alt="" />
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
