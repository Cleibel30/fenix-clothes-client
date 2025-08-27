import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Services } from "../layouts/Services"
import {useCateogories} from "../services/useCateogories"
import { useService } from "../services/useServices"

export const Type = () => {
    const { type_id } = useParams()
    const { getType } = useCateogories()
    const { getServiceAllByType } = useService()
    const [responseApi, setresponseApi] = useState(undefined)
    const [type, setType] = useState(undefined)

    useEffect(() => {
        getType(setType, type_id)
        getServiceAllByType(setresponseApi, type_id)
    }, [])
    

    return (
        <>
            <div className="container-fluid marginTop">
                <Services responseApi={responseApi} title={(type && type.success) && type.data.title} cont={8} />
            </div>
        </>
    )
}
