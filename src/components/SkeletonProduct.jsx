import React from 'react'

export const SkeletonProduct = ({ cont }) => {
    return (
        <div className="container">
            <div className="row row-gap-3">
                {Array.from({ length: cont }).map((_, idx) => (
                    <div key={idx} className="col-sm-12 col-md-6 col-lg-3">

                        <div className="card overflow-hidden" aria-hidden="true">
                            <div className="skeleton-product"></div>
                            <div className="card-body">
                                <h5 className="card-title placeholder-glow">
                                    <span className="placeholder col-6"></span>
                                </h5>
                                <p className="card-text placeholder-glow">
                                    <span className="placeholder col-7"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-8"></span>
                                </p>

                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
