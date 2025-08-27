import { useEffect, useState } from "react"
import { useVoucher } from "../services/useVoucher"
import { ShowVoucher } from "../layouts/ShowVoucher"
import { useNotify } from "../services/useNotify"

export const Notifications = () => {
    const [activeContent, setactiveContent] = useState(false)
    const [item, setitem] = useState(undefined)
    const [activeVouchers, setactiveVouchers] = useState(false)
    const { notifyUser, activeNotify } = useNotify()
    const [responseApi, setresponseApi] = useState([]);
    const [notifyActive, setnotifyActive] = useState(false)
    const [seen, setseen] = useState(false)
    const [responseActiveSeen, setresponseActiveSeen] = useState(undefined)
    const [activeNotifyContent, setactiveNotifyContent] = useState(false)


    const [responseVouchers, setresponseVouchers] = useState(undefined)

    const { getAll } = useVoucher()

    useEffect(() => {
        getAll(setresponseVouchers)
    }, [activeVouchers])

    useEffect(() => {

        notifyUser(setresponseApi)

    }, [])


 /*    useEffect(() => {

        if (responseApi.length > 0 && responseApi[responseApi.length - 1].success && responseApi[responseApi.length - 1].data.length > 0) {
            const arrNotifications = responseApi[responseApi.length - 1].data
            const notiActive = arrNotifications.find(item => item.seen == false)

            if (notiActive) setnotifyActive(true)
            if (!notiActive) setnotifyActive(false)

        }

        getAll(setresponseVouchers)
    }, [responseApi]) */


   /*  useEffect(() => {
        if (seen) {
            activeNotify(setresponseActiveSeen)
            setnotifyActive(false)
        }
    }, [seen]) */

    const notify = () => {
        setactiveNotifyContent(!activeNotifyContent)

        if (activeVouchers) setactiveVouchers(false)
        if (!activeVouchers) setactiveVouchers(true)

        /* if (seen) setseen(false)
        if (!seen) setseen(true) */
    }

    const showVoucher = (item) => {
        setitem(item)
        setactiveContent(true)
    }


    const changeDate = (date) => {
        const [year, day, month] = date.split("-")

        return `${day}-${month}-${year}`

    }

    console.log(responseVouchers)

    return (
        <>
            <button id="btn-notify" className='button h-100  position-relative' onClick={notify} >
                <i class="text-light fa-regular fa-bell fs-4 mt-1"></i>
                {notifyActive && <i class="fa-solid fa-circle text-danger position-absolute top-0 end-0 min-size"></i>}
            </button>

            {activeNotifyContent && (
                <div className=" top-notify notify-content bg-light rounded shadow-sm">

                    <div className="d-flex flex-column gap-2">
                        


                        {(responseVouchers && responseVouchers.success) ? (
                            <>
                                <div className="d-flex flex-column gap-1 p-2">
                                    <p className="nav_font fw-bold px-1 text-dark">Comprobantes</p>
                                    {responseVouchers.data.map(item => (
                                        <div onClick={() => showVoucher(item)} className="p-2 bg-light shadow-sm rounded button voucher-element d-block w-100 text-dark">
                                            <span>{item.product.title.length >= 14 ? `${item.product.title.slice(0, 14)}..` : item.product.title}. Cantidad: {item.quantity}, talla: {item.size}, monto total: Ref. {item.amount}</span>
                                            <span className={`${item.check ? 'bg-primary' : 'bg-danger'} p-1 rounded text-light voucher-element ms-2`}>{item.check ? 'Aprobado' : 'Sin aprobar'}</span> </div>
                                    ))}
                                </div>
                            </>
                        ) : <p className="nav_font fw-bold p-1 text-dark">Sin comprobantes</p>}
                    </div>
                </div>
            )}



            {activeContent && <ShowVoucher update={getAll} setresponseApi={setresponseVouchers} item={item} setactiveContent={setactiveContent} />}
        </>
    )
}
