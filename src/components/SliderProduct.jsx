import React from 'react'
import { useRouteApi } from '../services/useRouteApi'

export const SliderProduct = ({ images, service }) => {
    const {api} = useRouteApi()
    return (
        <>
            {images ? (
                <div id="carouselExampleFade" className="carousel slide carousel-fade position-relative start-0 top-0">
                    <div className="carousel-inner ">
                        {images.map(item => (
                            <div className="carousel-item active">
                                <img src={service ? `${api}/api/images/get_image_type/${item.image_url}` : `${api}/api/images/get_image/${item.image_url}`} className="d-block w-100 rounded" height="500px" alt="..." />
                            </div>
                        ))}

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">

                        <i class="fa-solid fa-chevron-left fs-3 text-dark"></i>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">

                        <i class="fa-solid fa-chevron-right fs-3 text-dark"></i>
                    </button>
                </div>
            ): <div class="skeleton-box rounded"></div>}
        </>
    )
}
