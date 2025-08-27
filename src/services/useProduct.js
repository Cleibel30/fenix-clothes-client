import axios from 'axios'
import { useRouteApi } from './useRouteApi';

export const useProduct = () => {

    const api = import.meta.env.VITE_API;

    const getProductsHome = async (setresponseApi) => {

        axios.get(`${api}/api/product/getHome`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };
    const getProductsAll = async (setresponseApi) => {

        axios.get(`${api}/api/product/getAll`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };
    const getProduct = async (setresponseApi, product_id) => {

        axios.get(`${api}/api/product/get/${product_id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };
    const getProductsCategory = async (setresponseApi, category_id) => {

        axios.get(`${api}/api/product/getCategory/${category_id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };
    const getProductsSearch = async (setresponseApi, search) => {

        axios.get(`${api}/api/product/search/${search}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const verifyQuantity = async (setresponseApi, product_id, qunatity) => {

        axios.get(`${api}/api/product/verifyQuantity/${product_id}/${qunatity}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    return {
        getProductsHome,
        getProduct,
        getProductsAll,
        getProductsCategory,
        getProductsSearch,
        verifyQuantity
    }
}
