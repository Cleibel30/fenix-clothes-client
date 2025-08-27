import React from 'react'
import axios from 'axios'
import { useRouteApi } from './useRouteApi'

export const useGoogleSesion = () => {
  const api = import.meta.env.VITE_API;
  
  const googleLogin = async (credentialResponse, setresponseApi) => {
    const body = { name: credentialResponse.name, email: credentialResponse.email }

    try {
      const response = await axios.post(`${api}/api/users/google`, body, { withCredentials: true });
      setresponseApi(response.data);
      localStorage.setItem('token', response.data.data);
    } catch (error) {
      setresponseApi(error.response.data);
    }
  }
  return {
    googleLogin
  }
}
