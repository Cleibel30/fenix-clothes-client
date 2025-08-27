import React from 'react'
import axios from 'axios';
import { useRouteApi } from './useRouteApi';

export const useSesion = () => {
  const { api } = useRouteApi()

  //Peticion de inicio de sesion

  const startSesion = (email, password, setresponseApi) => {

    //Body del login
    const body = { email, password }
    axios.post(`${api}/api/users/login`, body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
      .then(response => {
        //Envio de la respusesta al pages
        setresponseApi(response.data)
        localStorage.setItem('token', response.data.data);
      })
      //Envio de la respusesta de error al pages
      .catch(error => setresponseApi(error.response.data));
  }

  const codeRecover = async (email, setresponseApiRecover) => {
    const body = { email }

    axios.post(`${api}/api/users/update_pass_email`, body, { withCredentials: true })
      .then(response => setresponseApiRecover(response.data))
      .catch(error => setresponseApiRecover(error.response.data));
  }

  const recoverPass = (password, repeatPassword, token, setresponseApi) => {
    const body = { password, repeatPassword }
    axios.patch(`${api}/api/users/update_pass`, body, { headers: { 'Content-Type': 'application/json', 'verificationCode': token }, withCredentials: true })
      .then(response => {
        setresponseApi(response.data)
      })
      .catch(error => setresponseApi(error.response.data));
  }

  return {
    startSesion,
    codeRecover,
    recoverPass
  }
}
