import React, { useEffect, useState, useRef, act } from 'react';
import { useChat } from '../services/useChat';
import { ChatContent } from '../layouts/ChatContent';

export const Chat = () => {
  const { chat, activeMessage, socket } = useChat();

  const [responseApi, setResponseApi] = useState(undefined);
  const [activeChat, setActiveChat] = useState(false);
  const [responseActiveChat, setresponseActiveChat] = useState(undefined)
  const [msg, setmsg] = useState(undefined)

  const chatBodyRef = useRef(null);

  // Obtener el chat del usuario
  useEffect(() => {
    chat(setResponseApi);
  }, []);

  useEffect(() => {
    if(!activeChat) chat(setResponseApi);
  }, [activeChat]);

  const handleActiveMessage = () => {
    if(responseApi && responseApi.success) activeMessage(setresponseActiveChat)
    setActiveChat(true)
  }

  useEffect(() => {
    if(msg) chat(setResponseApi);
    if(activeChat) activeMessage(setresponseActiveChat)
  }, [msg])



  useEffect(() => {
    if (responseApi && responseApi.success) {
      const chat_id = responseApi.data.chat_id
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
    }
  }, [responseApi, socket]);


  // 🧠 Escuchar mensajes en tiempo real
  useEffect(() => {
    const handleMessage = (msg) => {
      if(msg.sender_type == 'staff') setmsg(msg);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);


  return (
    <div className="chat-container">
      {!activeChat && (
        <button
          onClick={handleActiveMessage}
          className="button button-chat shadow-sm position-relative text-dark bg-light fs-3"
        >
          <i className="fa-regular fa-comment-dots"></i>
          {responseApi && responseApi.success && responseApi.data.seen_user && (
            <i class="fa-solid fa-circle text-danger position-absolute top-0 end-0 fs-5"></i>
          )}
        </button>
      )}

      {(activeChat && responseApi && responseApi.success) && (
        <ChatContent
          setActiveChat={setActiveChat}
          activeChat={activeChat}
          chat_id={responseApi.data.chat_id}
          update={chat}
          setUpdate={setResponseApi}
        />
      )}
    </div>
  );
};
