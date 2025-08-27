import { useEffect, useState } from "react"
import { useFavorite } from '../services/useFavorite'
import { FavoritesBag } from "../layouts/FavoritesBag"

export const Favorites = () => {
  const { getFavorites } = useFavorite()
  const [responseApi, setresponseApi] = useState(undefined)

  useEffect(() => {
    getFavorites(setresponseApi)

  }, [])

  return (
    <>
      <div className="container-fluid marginTopProducts">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-2"></div>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <FavoritesBag responseApi={responseApi} cont={16} title="Todos tus favoritos" verMas={true} />
          </div>

        </div>
      </div>
    </>
  )
}
