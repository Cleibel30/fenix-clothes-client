import React, { useState } from 'react'
import { Product } from '../components/Product'
import { SkeletonProduct } from '../components/SkeletonProduct'
import { Link } from 'react-router-dom'
import { useRouteApi } from '../services/useRouteApi'

export const Products = ({ responseApi, title, cont, verMas }) => {
        const { api } = useRouteApi()

        const [rangeValue, setrangeValue] = useState(0)
        const [arrFilterPrice, setarrFilterPrice] = useState([]);
        const [filter, setfilter] = useState(false)

        const filterPrice = (e) => {
                if (e?.preventDefault) e.preventDefault();

                if (rangeValue > 0 && Array.isArray(arrFilterPrice) && responseApi?.success) {
                        const filter = responseApi.data.filter(item => Number(item.price) <= rangeValue);
                        setarrFilterPrice(filter);
                        setfilter(true);

                }
        };

        const cancelFilter = (e) => {
                if (responseApi && responseApi.success) {
                        setarrFilterPrice([]);
                        setfilter(false);
                        setrangeValue(0);
                }
        }




        return (

                <section className='container mt-4 pb-4'>
                        <div className="d-flex justify-content-between flex-wrap">
                                <h2 className=' nav_font mb-3'>{title}</h2>
                                {verMas && (
                                        <form onSubmit={filterPrice} className='d-flex flex-wrap align-items-center mb-3 gap-2'>
                                                {rangeValue ? (<span className='me-3'>Precio máximo Ref. {rangeValue}</span>) : <span className='ms-2'>Precio máximo Ref. 0</span>}
                                                <input type="range" min="0" max="250" onChange={(e) => setrangeValue(e.target.value)} />
                                                <button type='submit' className='button bg-danger rounded p-1 min-size text-light'>Filtrar</button>
                                                <button type='button' onClick={cancelFilter} className='button bg-danger rounded p-1 min-size text-light'>Cancelar</button>
                                        </form>
                                )}
                                {!verMas && <Link to="/productos" className='fs-6 p-4 text-light'>Ver más</Link>}</div>
                        <div className="container-fluid">
                                <div className="row row-gap-3">
                                        {(responseApi && responseApi.success && arrFilterPrice.length == 0 && !filter) ? (
                                                responseApi.data.slice(0, 30).map(item => (
                                                        <div className="col-md-6 col-sm-12 col-lg-3">
                                                                <Product img={`${api}/api/images/get_image/${item.images[0].image_url}`} title={item.title} price={item.price} id={item.product_id}></Product>
                                                        </div>
                                                ))
                                        ) : (
                                                (arrFilterPrice.length > 0) ? (
                                                        arrFilterPrice.map(item => (
                                                                <div className="col-md-6 col-sm-12 col-lg-3">
                                                                        <Product img={`${api}/api/images/get_image/${item.images[0].image_url}`} title={item.title} price={item.price} id={item.product_id}></Product>
                                                                </div>
                                                        ))
                                                ) : ((responseApi && responseApi.success) && <h1 className='text-center nav_font mt-5'>Sin resultados 😕</h1>)
                                        )}

                                        {!responseApi && <SkeletonProduct cont={cont} />}

                                </div>
                        </div>
                </section>
        )
}
