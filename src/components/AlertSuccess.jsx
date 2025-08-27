import React from 'react'
import { useEffect } from 'react'

export const AlertSuccess = ({ value, setactiveAlert }) => {

    useEffect(() => {
        setTimeout(() => {
            setactiveAlert(false)
        }, 3000);
    }, [])


    return (
        <div className="alert alert-success d-flex align-items-center position-fixed mt-2 me-2 top-0 end-0 position-content position-content position-content" role="alert">
            <i className="fa-solid fa-circle-check me-1"></i>
            <div>
                {value}
            </div>
        </div>

    )
}
