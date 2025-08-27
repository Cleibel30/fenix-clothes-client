import React, { useEffect, useState } from 'react'
import { Product } from '../components/Product'
import { SkeletonProduct } from '../components/SkeletonProduct'

export const Services = ({ responseApi, title, cont }) => {
        return (

                <section className='container rounded-2 mt-5 shadow-sm white pb-4 marginTop'>
                        <div className="d-flex justify-content-between flex-wrap">
                                <h2 className='fw-bold nav_font mb-3'>{title}</h2>
                        </div>
                        <div className="container-fluid">
                                <div className="row row-gap-3">
                                        {(responseApi && responseApi.success) && (
                                                responseApi.data.map(item => (
                                                        <div className="col-md-6 col-sm-12 col-lg-3">
                                                                <Product service={true} img={`http://localhost:3000/api/images/get_image_type/${item.image_services[0].image_url}`} title={item.title} price={item.price} id={item.service_id}></Product>
                                                        </div>
                                                ))
                                        )}

                                        {!responseApi && <SkeletonProduct cont={cont} />}

                                </div>
                        </div>
                </section>
        )
}
