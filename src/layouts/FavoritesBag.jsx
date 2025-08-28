import React, { useEffect, useState } from 'react'
import { Product } from '../components/Product'
import { SkeletonProduct } from '../components/SkeletonProduct'
import { useFavoriteStorage } from '../hooks/useFavoriteStorage'
import { useRouteApi } from '../services/useRouteApi'

export const FavoritesBag = ({ responseApi, title, cont, bag }) => {
        const clave = 'favoritos';
        const { api } = useRouteApi()

        const { favoritos } = useFavoriteStorage()

        return (

                <section className='container rounded-2 mt-4 white pb-4 marginTop'>
                        <div className="d-flex justify-content-between flex-wrap">
                                <h2 className='mb-3'>{title}</h2>
                        </div>
                        <div className="container-fluid">
                                <div className="row row-gap-3">
                                        {(localStorage.getItem(clave) && favoritos.length > 0) && (
                                                favoritos.map(item => (
                                                        <div className="col-md-6 col-sm-12 col-lg-3">
                                                                <Product img={`${api}/api/images/get_image/${item.images[0].image_url}`} title={item.product.title} price={item.product.price} id={item.product.product_id}></Product>
                                                        </div>
                                                ))
                                        )}

                                        {!favoritos && <SkeletonProduct cont={cont} />}

                                        {(favoritos.length == 0 || !localStorage.getItem(clave)) && <h1 className='text-center nav_font mt-5'>No hay {bag ? 'productos en la bolsa.' : 'favoritos.'} 😕</h1>}

                                </div>
                        </div>
                </section>
        )
}
