import React, { useEffect, useState } from 'react'
import { Product } from '../components/Product'
import { SkeletonProduct } from '../components/SkeletonProduct'

export const FavoritesBag = ({ responseApi, title, cont, bag }) => {

        const [response, setresponse] = useState([])

        useEffect(() => {
          if(responseApi && responseApi.success) {
                const products = responseApi.data
                const filterProduct = products.filter(item => item.product.active == true)
                setresponse(filterProduct)
          }
        }, [responseApi])
        

        return (

                <section className='container rounded-2 mt-4 shadow-sm white pb-4 marginTop'>
                        <div className="d-flex justify-content-between flex-wrap">
                                <h2 className='mb-3'>{title}</h2>
                        </div>
                        <div className="container-fluid">
                                <div className="row row-gap-3">
                                        {(responseApi && responseApi.success && response.length > 0) && (
                                                response.map(item => (
                                                        <div className="col-md-6 col-sm-12 col-lg-3">
                                                                <Product img={`http://localhost:3000/api/images/get_image/${item.product.images[0].image_url}`} title={item.product.title} price={item.product.price} id={item.product_id} quantity={item.quantity} bag={bag}></Product>
                                                        </div>
                                                ))
                                        )}

                                        {!responseApi && <SkeletonProduct cont={cont} />}

                                        {(responseApi && !responseApi.success) && <h1 className='text-center nav_font mt-5'>No hay {bag ? 'productos en la bolsa.' : 'favoritos.'} 😕</h1>}

                                </div>
                        </div>
                </section>
        )
}
