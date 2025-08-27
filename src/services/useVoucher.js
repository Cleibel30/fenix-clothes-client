import axios from 'axios'
import { useRouteApi } from './useRouteApi';


const token = localStorage.getItem('token')

export const useVoucher = () => {
    const { api } = useRouteApi()
    const sendVoucherInfo = async (setresponseApi, product_id, quantity, amount, dollar_rate, size) => {

        const body = {
            quantity,
            amount,
            dollar_rate,
            size
        }

        axios.post(`${api}/api/voucher/create/${product_id}`, body, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const sendVoucherImg = async (setresponseApi, voucher_id, formData) => {

        axios.post(`${api}/api/images/send_voucher/${voucher_id}`, formData, { headers: { 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const getAll = async (setresponseApi) => {

        axios.get(`${api}/api/voucher/getAllUser`, { headers: { 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const deleteVoucher = async (setresponseApi, voucher_id) => {

        axios.delete(`${api}/api/voucher/delete/${voucher_id}`, { headers: { 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    return {
        sendVoucherInfo,
        sendVoucherImg,
        getAll,
        deleteVoucher
    }
}
