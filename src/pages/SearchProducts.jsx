import React, { useState } from 'react'
import { useEffect } from "react";
import { useProduct } from "../services/useProduct";
import { Products } from "../layouts/Products";

import { useParams } from 'react-router-dom';

export const SearchProducts = () => {
  const [responseApi, setResponseApi] = useState(undefined);
  const { getProductsSearch } = useProduct();
  const {search} = useParams()

  useEffect(() => {
    if (search) {
      getProductsSearch(setResponseApi, search);
    }else{
      window.location.href = '/';
    }
  }, [])


  
  return (
    <>
      <div className="container-fluid marginTopProducts">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <Products responseApi={responseApi} cont={16} title={"Resultado de la búsqueda: " + search} verMas={true} />
          </div>
        </div>
      </div>
    </>
  )
}
