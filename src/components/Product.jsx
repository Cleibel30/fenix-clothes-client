import { useEffect, useState } from "react"
import "../styles/products.css"
import { useDolar } from "../services/useDolar"
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import { Buy } from "../layouts/Buy";
import { useProduct } from "../services/useProduct";
import { AlertSuccess } from "./AlertSuccess";
import { AlertDanger } from "./AlertDanger";


export const Product = ({ img, title, price, id, quantity, bag }) => {
  const [activeAlertSuccess, setactiveAlertSuccess] = useState(false)
  const [activeAlertDanger, setactiveAlertDanger] = useState(false)
  const [responseApi, setresponseApi] = useState(undefined)
  const { verifyQuantity } = useProduct()
  const { ref, inView } = useInView({
    threshold: 0.1,         // % visible para activar
    triggerOnce: true,      // Solo una vez
  });
  const [dolar, setdolar] = useState(undefined)
  const { getDolar } = useDolar()

  useEffect(() => {
    getDolar(setdolar)
  }, [])


  const buyProduct = () => {
    verifyQuantity(setresponseApi, id, quantity)
  }

  useEffect(() => {
    if (responseApi && !responseApi.success) {
      setactiveAlertDanger(true)
    }

  }, [responseApi])

  return (
    <>
      <div className=" product-card">
        <Link to={`/producto/${id}`} className='w-100 zoom-img d-block'>
          <img className='w-100 ' src={img} alt="" />
        </Link>
        <div className="info info-h">
          <h3 className='text-start pt-1 special fs-6 title-product'>{title.length > 50 ? title.slice(0 , 50) + "..." : title} </h3>
          <p className='text-start p-0 fs-6'>{price} </p>
        </div>
      </div>
    </>
   

    
  )
}
