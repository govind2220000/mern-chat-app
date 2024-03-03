import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import notificationSound from "../assets/sounds/frontend-src-assets-sounds-notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    //we are "socket?.on" in case if we dpnt have any socket connection object it should not crash
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      if (selectedConversation._id == newMessage.senderId) {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      }
    });

    //cleanup function
    return () => socket?.off("newMessage");
  }, [messages, socket, setMessages]);
};

export default useListenMessages;
