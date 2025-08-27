import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useRouteApi } from './useRouteApi';

export const useNotify = () => {
    const { api } = useRouteApi()
    const token = localStorage.getItem('token');

    const notifyUser = (setresponseApi) => {
        const eventSource = new EventSourcePolyfill(`${api}/api/notify/notificationsUserAll`, {
            headers: {
                token: token
            }
        });

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setresponseApi(prev => [...prev, parsedData]);
        };


        eventSource.onerror = (err) => {
            console.warn("Error en SSE, intentando reconectar...", err);

        };


        return () => {
            eventSource.close();
        };
    }


    const activeNotify = async (setresponseApi) => {

        axios.get(`${api}/api/notify/activeUser`, { headers: { 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    return {
        notifyUser,
        activeNotify
    }
}
