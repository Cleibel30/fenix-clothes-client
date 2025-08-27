import axios from 'axios'
import { useRouteApi } from './useRouteApi';

const token = localStorage.getItem('token')

export const useBag = () => {
    const api = import.meta.env.VITE_API;

    const getBag = async (setresponseApi, product_id) => {

        axios.get(`${api}/api/bag/get/${product_id}`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const addDeleteBag = async (setresponseApi, product_id, quantity) => {

        axios.post(`${api}/api/bag/bag/${product_id}/${quantity}`, {}, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };
    const updateBag = async (setresponseApi, product_id, quantity) => {

        axios.patch(`${api}/api/bag/update/${product_id}/${quantity}`, {}, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const getBagAll = async (setresponseApi) => {

        axios.get(`${api}/api/bag/getAll`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };
   
    return {
        getBag,
        addDeleteBag,
        updateBag,
        getBagAll
    }
}
