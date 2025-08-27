import React, { useState } from 'react'
import { useEffect } from "react";
import { useProduct } from "../services/useProduct";
import { Products } from "../layouts/Products";
import { useSearchParams } from 'react-router-dom';

export const SearchProducts = () => {
  const [responseApi, setResponseApi] = useState(undefined);
  const [searchParams] = useSearchParams();
  const { getProductsSearch } = useProduct();

  useEffect(() => {
    const search = searchParams.get('search');
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
            <Products responseApi={responseApi} cont={16} title={"Resultado de la búsqueda: " + searchParams.get('search')} verMas={true} />
          </div>
        </div>
      </div>
    </>
  )
}
