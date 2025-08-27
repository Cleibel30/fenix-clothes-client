import React, { useRef, useState } from 'react'

export const Sizes = ({setsizeValue, sizeData}) => {
    const sizeCont = useRef()
    const sizeValidate = /^(S|M|L|XL)$/

    const selectSize = (e) => {
        if (e.target.name === "btn-size") {

            const sizeContAll = Array.from(sizeCont.current.children);

            sizeContAll.forEach(item => {
                item.classList.remove("btn-size_active");
            });

            const sizeValue = e.target.innerText.toUpperCase()

            if(!sizeValidate.test(sizeValue)) return

            if (sizeData == e.target.innerText) {
                e.target.classList.remove("btn-size_active")
                setsizeValue("")
            }
            else {
                setsizeValue(sizeValue)
                e.target.classList.add("btn-size_active")
            }

        }
    }
    

    return (
        <div className="mb-3">
            <h3 className='fs-5 fw-bold'>Tallas</h3>
            <div className='d-flex gap-1' ref={sizeCont} onClick={selectSize}>
                <button name='btn-size' className='btn-size'>S</button>
                <button name='btn-size' className='btn-size'>M</button>
                <button name='btn-size' className='btn-size'>L</button>
                <button name='btn-size' className='btn-size'>XL</button>
            </div>
        </div>
    )
}
