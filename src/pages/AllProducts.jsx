import { useEffect, useState } from "react"
import { Products } from "../layouts/Products";
import { useProduct } from "../services/useProduct";

export const AllProducts = () => {
    const [responseApi, setresponseApi] = useState(undefined)
    const { getProductsAll } = useProduct()

    useEffect(() => {
        getProductsAll(setresponseApi)
    }, [])
    return (
        <>
            <div className="container-fluid marginTopProducts">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-2"></div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <Products responseApi={responseApi} cont={16} title="Todos los Productos" verMas={true}/>
                    </div>
                        
                </div>
            </div>
        </>
    )
}
