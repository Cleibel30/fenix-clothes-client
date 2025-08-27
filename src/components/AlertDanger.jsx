import React from 'react'
import { useEffect } from 'react'

export const AlertDanger = ({ value, setactiveAlert }) => {

    useEffect(() => {
        setTimeout(() => {
            setactiveAlert(false)
        }, 3000);
    }, [])
    

    return (
        <div className="alert alert-warning d-flex align-items-center position-fixed mt-2 me-2 top-0 end-0 position-content" role="alert">
            <i class="fa-solid fa-circle-exclamation me-1"></i>
            <div>
                {value}
            </div>
        </div>

    )
}
