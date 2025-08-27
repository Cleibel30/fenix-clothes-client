import { useEffect, useState } from "react";
import { Main } from "../layouts/Main";
import { Products } from "../layouts/Products";
import { useProduct } from "../services/useProduct";
import { Message } from "../components/Message";

export const Home = () => {
  const api = import.meta.env.VITE_API;
  
  const [responseApi, setresponseApi] = useState(undefined)
  const { getProductsAll } = useProduct()

  useEffect(() => {
    getProductsAll(setresponseApi)
  }, [])


  const closeSession = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }


  return (
    <>
      <Message />

      <Main />

      <Products responseApi={responseApi} title="Algunos Productos" cont={4}></Products>

    </>
  )
}
