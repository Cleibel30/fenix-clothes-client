import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Products } from "../layouts/Products";
import { useProduct } from "../services/useProduct";
import { useCateogories } from '../services/useCateogories';

export const CategoryProducts = () => {
    const { getProductsCategory } = useProduct();
    const { getCategory } = useCateogories();
    const [category, setcategory] = useState(undefined)
    const [responseApi, setResponseApi] = useState(undefined);
    const { category_id } = useParams();


    useEffect(() => {
        getProductsCategory(setResponseApi, category_id);
        getCategory(setcategory, category_id);
    }, [category_id]);
   


   
    return (
        <>
            <div className="container-fluid marginTopProducts">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-2"></div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <Products responseApi={responseApi} cont={16} title={(category && category.success) && category.data.title} verMas={true} />
                    </div>

                </div>
            </div>
        </>
    );
}
