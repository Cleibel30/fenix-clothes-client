import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProduct } from '../services/useProduct'
import { SliderProduct } from '../components/SliderProduct'
import { useDolar } from "../services/useDolar"
import { ButtonForm } from "../components/ButtonForm"
import { IaMessage } from '../components/IaMessage'
import { useFavorite } from '../services/useFavorite'
import { useBag } from '../services/useBag'
import { Buy } from '../layouts/Buy'
import { AlertSuccess } from '../components/AlertSuccess'
import { AlertDanger } from '../components/AlertDanger'
import { Sizes } from '../components/Sizes'



export const ShowProduct = () => {
  const [responseApi, setresponseApi] = useState(undefined)
  const { getProduct } = useProduct()
  const [responseApiBuy, setresponseApiBuy] = useState(undefined)
  const [activeAlertSuccess, setactiveAlertSuccess] = useState(false)
  const [activeAlertDanger, setactiveAlertDanger] = useState(false)
  const [messageAlertDanger, setmessageAlertDanger] = useState("")
  const [sizeValue, setsizeValue] = useState("")

  const { getBag, addDeleteBag, updateBag } = useBag()

  const [bagData, setBagData] = useState(undefined)

  const [bag, setbag] = useState(undefined)

  const { product_id } = useParams()
  const [dolar, setdolar] = useState(undefined)
  const { getDolar } = useDolar()
  const { getFavorite, addDeleteFavorite } = useFavorite()
  const token = localStorage.getItem('token')
  const [favoriteData, setFavoriteData] = useState(undefined)
  const [favorite, setFavorite] = useState(undefined)
  const [count, setCount] = useState(0);
  const [updateBagData, setupdateBagData] = useState(undefined)

  const favoriteRef = useRef(null)
  const bagRef = useRef(null)

  const handleAddDeleteFavorite = () => {
    if (token) {
      addDeleteFavorite(setFavorite, product_id)
      if (favoriteRef.current) {
        favoriteRef.current.classList.toggle('text-danger')
        favoriteRef.current.classList.toggle('text-light')
      }
    } else {
      setmessageAlertDanger("Debes iniciar sesión para hacer esta acción.")
      setactiveAlertDanger(true)
    }
  }

  const handleAddDeleteBag = () => {
    if (token) {
      if (count > 0) {
        addDeleteBag(setbag, product_id, count)
        if (bagRef.current) {
          bagRef.current.classList.toggle('text-info')
          bagRef.current.classList.toggle('text-light')
        }
      }
    } else {
      setmessageAlertDanger("Debes iniciar sesión para hacer esta acción.")
      setactiveAlertDanger(true)
    }
  }

  // Función para incrementar el contador
  const handleIncrement = () => {
    if (token) {
      if (count < responseApi.data.product.quantity) {
        setCount(count + 1);
      }
    } else {
      setmessageAlertDanger("Debes iniciar sesión para hacer esta acción.")
      setactiveAlertDanger(true)
    }
  };

  const activeDes = () => {
    document.querySelector('.p-description').classList.toggle('d-none')
    document.querySelector('.more').classList.toggle('d-none')
    document.querySelector('.less').classList.toggle('d-none')
  }

  // Función para decrementar el contador
  const handleDecrement = () => {
    if (token) {
      if (count >= 1) {
        setCount(count - 1)
      };
    } else {
      setmessageAlertDanger("Debes iniciar sesión para hacer esta acción.")
      setactiveAlertDanger(true)
    }
  };

  useEffect(() => {
    if (token) updateBag(setupdateBagData, product_id, count)
  }, [count])


  useEffect(() => {
    getProduct(setresponseApi, product_id)
    getDolar(setdolar)

    if (token) {
      getFavorite(setFavoriteData, product_id)
      getBag(setBagData, product_id)
    }

  }, [])

  useEffect(() => {
    if (bagData && bagData.success) setCount(bagData.data.quantity)
  }, [bagData])

  const buyProduct = (e) => {
    e.preventDefault()
    if (responseApi && responseApi.success && count > 0 && count <= responseApi.data.product.quantity && token && sizeValue.trim() != "") setresponseApiBuy(true)
    if (count > responseApi.data.product.quantity) {
      setmessageAlertDanger("La cantidad seleccionada supera el stock disponible.")
      setactiveAlertDanger(true)
    }
    if (!token) {
      setmessageAlertDanger("Debes iniciar sesión para hacer esta acción.")
      setactiveAlertDanger(true)
    }
  }


  return (
    <>
      {activeAlertSuccess && <AlertSuccess value="Comprobante subido correctamente." setactiveAlert={setactiveAlertSuccess} />}
      {activeAlertDanger && <AlertDanger value={messageAlertDanger} setactiveAlert={setactiveAlertDanger} />}

      <div className="container marginTopPage rounded p-4">
        <div className="row row-gap-2">
          <div className="col-md-12 col-sm-12 col-lg-7 p-0 pe-lg-2">
            {(responseApi && responseApi.success) && <SliderProduct images={responseApi.data.images} />}
          </div>
          <div className="col-md-12 col-sm-12 col-lg-5 p-0 ps-lg-2 ">
            <div className="icons d-flex gap-2 justify-content-end">
              <button ref={favoriteRef} className={`button ${(favoriteData && favoriteData.success) ? "text-danger" : "text-light"}`}><i onClick={handleAddDeleteFavorite} class="fa-solid fa-heart fs-4"></i></button>
              <button ref={bagRef} className={`button ${(bagData && bagData.success) ? "text-info" : "text-light"}`} onClick={handleAddDeleteBag}><i class="fa-solid fa-bag-shopping fs-4 "></i></button>
            </div>
            <h3 className="fs-3 fw-bold nav_font w-75">{(responseApi && responseApi.success) ? responseApi.data.product.title : <p className="placeholder-glow"> <span className="placeholder col-12"></span> </p>}</h3>




            {responseApi && responseApi.success ? (
              <p className='fw-bold'>Ref. {responseApi.data.product.price} - Bs. {(responseApi.data.product.price * dolar).toFixed(2)} </p>
            ) : <p className="placeholder-glow"> <span className="placeholder col-12"></span> </p>}


            <Sizes setsizeValue={setsizeValue} sizeData={sizeValue} />

            {(responseApi && responseApi.success) && <IaMessage product_id={product_id} />}

            <form action="" className='p-0 m-0 w-100' onSubmit={buyProduct}>
              {(responseApi && responseApi.success) && (
                <div className="d-flex mt-3 align-items-center flex-wrap gap-1">
                  <div className="d-flex count">
                    <button onClick={handleIncrement} type='button' className="button bg-danger text-light px-1">+</button>
                    <input type="number" value={count} />
                    <button onClick={handleDecrement} type='button' className="button bg-danger text-light px-1">-</button>
                  </div>
                  <p className='pt-3'>{(responseApi && responseApi.success && count > 0) && `Monto total: Ref. ${responseApi.data.product.price * count} - Bs. ${((responseApi.data.product.price * count) * dolar).toFixed(2)}`}</p>
                </div>
              )}

              <ButtonForm value="Comprar" />
              {responseApi && responseApi.success && (
                <Link target='_blank' to={`https://api.whatsapp.com/send?phone=4163038585&text=${responseApi.data.product.title}: `} className="ws mt-2 text-center text-decoration-none text-light"><i class="fa-brands fa-whatsapp fs-3 pe-2"></i><span className='fw-bold'>Pídelo por WhatsApp</span></Link>

              )}

            </form>

            <button className='mt-3 description-btn text-light' onClick={activeDes}>DESCRIPCIÓN <span className='more'>+</span> <span className='d-none less'>-</span></button>
            <p className="p-description text-ligth min-size d-none mt-2">{(responseApi && responseApi.success) ? responseApi.data.product.description : (
              <>
                <span className="placeholder col-6"></span>
                <span className="placeholder w-75"></span>
                <span className="placeholder" style={{ width: "25%" }}></span>
              </>
            )}</p>
          </div>

        </div>
      </div>

      {responseApiBuy && (
        <Buy setactiveAlert={setactiveAlertSuccess} dolar={dolar} amount={count * responseApi.data.product.price} setresponseApiBuy={setresponseApiBuy} quantity={count} price={responseApi.data.product.price} product_id={product_id} size={sizeValue} />
      )}

    </>
  )
}
