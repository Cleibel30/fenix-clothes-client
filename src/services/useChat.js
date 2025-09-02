import React, { useMemo, useRef } from 'react'
import axios from 'axios'
import { EventSourcePolyfill } from 'event-source-polyfill';
import { io } from 'socket.io-client';


export const useChat = () => {
    const api = "https://september-class-show-guidelines.trycloudflare.com"
    const token = useMemo(() => localStorage.getItem('token'), []);
    const socketRef = useRef(null);

    if (!socketRef.current) {
        socketRef.current = io(`${api}`, {
            autoConnect: true,
            transports: ['websocket'],
        });
    }
    const socket = socketRef.current;


    const chat = async (setresponseApi) => {
        axios.get(`${api}/api/chat/user`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }

    const createMessage = async (setresponseApi, body) => {
        axios.post(`${api}/api/chat/message/user`, body, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }

    const messagesAll = (setresponseApi, chat_id) => {
        axios.get(`${api}/api/chat/chat/${chat_id}`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }
    const activeMessage = (setresponseApi) => {
        axios.get(`${api}/api/chat/active_user`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }

    const deleteMsg = (setresponseApi, message_id) => {
        axios.delete(`${api}/api/chat/delete/user/${message_id}`, { headers: { 'Content-Type': 'application/json', 'token': token }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }


    return {
        chat,
        messagesAll,
        createMessage,
        socket,
        activeMessage,
        deleteMsg
    }
}
