import { useEffect, useState } from "react"
import { useFavorite } from '../services/useFavorite'
import { FavoritesBag } from "../layouts/FavoritesBag"
import { useBag } from "../services/useBag"

export const Bag = () => {
  const { getBagAll } = useBag()
  const [responseApi, setresponseApi] = useState(undefined)


  useEffect(() => {
    getBagAll(setresponseApi)
  }, [])

  return (
    <>
      <div className="container-fluid marginTopProducts">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-2"></div>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <FavoritesBag responseApi={responseApi} cont={16} title="Productos en tu bolsa" verMas={true} bag={true} />
          </div>

        </div>
      </div>
    </>
  )
}
