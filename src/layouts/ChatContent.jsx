import React, { useEffect, useState, useRef } from 'react';
import { useChat } from '../services/useChat';

export const ChatContent = ({ setActiveChat, chat_id, activeChat }) => {
    const { createMessage, socket, messagesAll, deleteMsg } = useChat();

    const [responseMessages, setResponseMessages] = useState([]);
    const [responseApi, setResponseApi] = useState(undefined);
    const [responseDeleteMsg, setresponseDeleteMsg] = useState(undefined)
    const [message, setMessage] = useState("");

    const chatBodyRef = useRef(null);

    // 🗨️ Obtener mensajes del chat

    useEffect(() => {
        messagesAll(setResponseApi, chat_id);
    }, []);

    useEffect(() => {
        if (responseApi && responseApi.success) {
            setResponseMessages(prev => {
                const newMessages = responseApi.data || [];
                // Evitar duplicados
                const existingIds = new Set(prev.map(m => m.message_id));
                const filteredNewMessages = newMessages.filter(m => !existingIds.has(m.message_id));
                if (filteredNewMessages.length === 0) return prev; // No new messages to
                // agregar
                
                // Agregar nuevos mensajes sin duplicados
                return filteredNewMessages.length === 0 ? prev :
                    prev.length === 0 ? filteredNewMessages :
                        filteredNewMessages.reduce((acc, msg) => {
                            if (!acc.some(m => m.message_id === msg.message_id)) {
                                acc.push(msg);
                            }
                            return acc;
                        }, [...prev]);

            }
            );
        }
    }, [responseApi]);


    // 🔄 Unirse al room y reconectar si el socket se reinicia
    useEffect(() => {
        const joinRoom = () => {
            if (socket?.connected) {
                socket.emit("join", chat_id);
                
            }
        };

        joinRoom();
        socket.on("connect", joinRoom);

        return () => {
            socket.emit("leave", chat_id);
           
            socket.off("connect", joinRoom);
        };
    }, [chat_id, socket]);

    // 🧠 Escuchar mensajes en tiempo real
    useEffect(() => {
        const handleMessage = (msg) => {
            

            setResponseMessages((prev) => {
                const exists = prev.some(m => m.message_id === msg.message_id);
                return exists ? prev : [...prev, msg];
            });
        };

        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
        };
    }, [socket]);

    useEffect(() => {
        const handleDeletedMessage = ({ message_id }) => {

            setResponseMessages(prev =>
                prev.filter(msg => msg.message_id !== message_id)
            );
        };

        socket.on('message-deleted', handleDeletedMessage);

        return () => {
            socket.off('message-deleted', handleDeletedMessage);
        };
    }, [socket]);

    // 📜 Scroll automático
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [activeChat, responseMessages]);

    // 📨 Enviar mensaje
    const sendMessage = (e) => {
        e.preventDefault();
        const trimmed = message.trim();
        if (trimmed.length === 0 || trimmed.length > 500) return;

        createMessage(() => { }, { content: trimmed });
        setMessage("");
    };

    // 📅 Formatear fecha
    const changeDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day.slice(0, 2)}-${month}-${year}`;
    };

    const deleteMessage = (msg) => {
        deleteMsg(setresponseDeleteMsg, msg.message_id)
    }

    return (

        <div className="">
            <div className="chat-content shadow-sm rounded bg-white overflow-hidden">
                <div className="chat-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-2 rose p-3 text-white nav_font">
                    <h5 className="m-0 text-dark">Chat</h5>
                    <button
                        onClick={() => setActiveChat(false)}
                        className="button-close-chat button p-0 bg-transparent border-0 text-dark fs-5"
                    >
                        <i className="fa-solid fa-xmark text-dark"></i>
                    </button>
                </div>

                <div className="d-flex flex-column justify-content-between message-cont p-2">
                    {!responseApi && (
                        <p className="text-center">Cargando mensajes...</p>
                    )}
                    {responseMessages.length === 0 && responseApi && !responseApi.success ? (
                        <p className="text-center">No hay mensajes en este chat.</p>
                    ) : (
                        <div ref={chatBodyRef} className="chat-body overflow-y-auto">
                            {responseMessages.map((item) => (
                                <div
                                    className={` d-flex flex-column align-items-${item.sender_type == 'staff' ? 'start' : 'end'} px-2`}
                                >
                                    <p
                                        className={`rounded-bottom rounded-${item.sender_type == 'staff' ? 'end' : 'start'} msg d-flex align-items-end flex-wrap justify-content-between gap-1 bg-${item.sender_type == 'staff' ? 'light' : 'primary'} text-${item.sender_type == 'staff' ? 'dark' : 'light'} ${item.sender_type == 'staff' && 'border'} p-2`}
                                    >
                                        <span style={{ wordBreak: 'break-all' }} className='min-size'>{item.content}</span> <span className='min-size-date'>{changeDate(item.date)} </span>
                                        {item.sender_type == 'user' && <button onClick={() => deleteMessage(item)} className='button text-light delete'><i class="fa-solid fa-trash-can"></i></button>}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    
                        <form
                            onSubmit={sendMessage}
                            className="chat-footer mt-2 d-flex gap-1 justify-content-between align-items-center"
                        >
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Escribe tu mensaje..."
                            />
                            <button className="button bg-primary px-3 py-2 rounded text-light"><i class="fa-solid fa-paper-plane"></i></button>
                        </form>
                    


                </div>
            </div>
        </div>


    );


};
