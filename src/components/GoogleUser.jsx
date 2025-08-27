import React, { useEffect, useState } from 'react'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Para decodificar el ID Token
import { useGoogleSesion } from '../services/useGoogleSesion';

export const GoogleUser = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE;
    const { googleLogin } = useGoogleSesion();
    const [responseApi, setresponseApi] = useState(undefined)

    console.log(responseApi)

    // Función que se ejecuta cuando el inicio de sesión es exitoso
    const handleLoginSuccess = (credentialResponse) => {

        // Decodifica el ID Token para extraer los datos del usuario
        try {
            const decoded = jwtDecode(credentialResponse.credential);

            googleLogin(decoded, setresponseApi); // Envía los datos al backend
        } catch (error) {
            console.error('Error al decodificar el ID Token:', error);
            setUserData(null); // Limpia los datos si hay un error
        }

    };

    // Función que se ejecuta si el inicio de sesión falla
    const handleLoginError = () => {
        console.error('Error en el inicio de sesión con Google');
        setUserData(null); // Limpia los datos si falla el login
    };

    useEffect(() => {
        if (responseApi && responseApi.success) {
            //Enviar a pagina de inicio
            window.location.replace("/");
        }
    }, [responseApi]);

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}  
            />
        </GoogleOAuthProvider>
    )
}