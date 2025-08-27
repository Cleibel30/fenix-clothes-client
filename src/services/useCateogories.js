import axios from 'axios';
import { useRouteApi } from './useRouteApi';

export const useCateogories = () => {
    const {api} = useRouteApi()
    
    const getCategoriesAll = async (setresponseApi) => {

        axios.get(`${api}/api/category/getCategoryAll`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const getCategory = async (setresponseApi, category_id) => {

        axios.get(`${api}/api/category/getCategory/${category_id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const getType = async (setType, type_id) => {

        axios.get(`${api}/api/type/getType/${type_id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setType(response.data)
            })
            .catch(error => setType(error.response.data));
    };

  return {
        getCategoriesAll,
        getCategory,
        getType
  }
}

