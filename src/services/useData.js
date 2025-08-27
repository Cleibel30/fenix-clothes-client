import React from 'react'
import axios from 'axios'
import { useRouteApi } from './useRouteApi'

export const useData = () => {
    const api = import.meta.env.VITE_API;
    const getData = async (setresponseApi) => {
        axios.get(`${api}/api/data/data`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }
    return {
        getData
    }
}
