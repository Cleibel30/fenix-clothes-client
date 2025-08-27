import React from 'react'

export const ButtonForm = ({ value }) => {
    return (
        <button type='submit' className='button-form  fw-bold text-light mt-4'>
            {value}
        </button>
    )
}
