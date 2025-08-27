import axios from 'axios'
import { useRouteApi } from './useRouteApi';

const token = localStorage.getItem('token')

export const useFavorite = () => {
    const {api} = useRouteApi()

    const getFavorite = async (setresponseApi, product_id) => {

        axios.get(`${api}/api/favorite/getFavorite/${product_id}`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const getFavorites = async (setresponseApi) => {

        axios.get(`${api}/api/favorite/favoritesAll`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const addDeleteFavorite = async (setresponseApi, product_id) => {

        axios.post(`${api}/api/favorite/favorite/${product_id}`, {}, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };
   
    return {
        getFavorite,
        addDeleteFavorite,
        getFavorites
    }
}
