import { useEffect, useState } from "react"
import { Services } from "../layouts/Services"
import {useCateogories} from "../services/useCateogories"
import { useService } from "../services/useServices"

export const AllService = () => {
    const { getType } = useCateogories()
    const { getServiceAll } = useService()
    const [responseApi, setresponseApi] = useState(undefined)

    useEffect(() => {
        getServiceAll(setresponseApi)
    }, [])
    

    return (
        <>
            <div className="container-fluid marginTop">
                <Services responseApi={responseApi} title='Todos los Servicios' cont={8} />
            </div>
        </>
    )
}
