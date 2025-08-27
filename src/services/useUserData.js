import React from 'react'
import axios from 'axios'
import { useRouteApi } from './useRouteApi';

const token = localStorage.getItem('token');

export const useUserData = () => {
  const api = import.meta.env.VITE_API;
  const getUserData = async (setresponseApi) => {

    axios.get(`${api}/api/users/data`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
      .then(response => {
        setresponseApi(response.data)
      })
      .catch(error => setresponseApi(error.response.data));
  };

  return {
    getUserData
  }
}
