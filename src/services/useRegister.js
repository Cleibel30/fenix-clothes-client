import React, { useState } from 'react'
import axios from 'axios'
import { useRouteApi } from './useRouteApi'

export const useRegister = () => {
    const api = import.meta.env.VITE_API;

    const codeRegister = async (email, setresponseApi) => {
        const body = { email }

        axios.post(`${api}/api/users/code`, body, { withCredentials: true })
            .then(response => setresponseApi(response.data))
            .catch(error => setresponseApi(error.response.data));
    }

    const registerUser = (name, email, password, repeatPassword, code, setresponseApi, token) => {
        const body = { name, email, password, repeatPassword, code }
        axios.post(`${api}/api/users/register`, body, { headers: { 'Content-Type': 'application/json', 'verificationCode': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
                localStorage.setItem('token', response.data.data);
            })
            .catch(error => setresponseApi(error.response.data));
    }


    return {
        codeRegister,
        registerUser
    }

}
