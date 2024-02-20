import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import notificationSound from "../assets/sounds/frontend-src-assets-sounds-notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    //we are "socket?.on" in case if we dpnt have any socket connection object it should not crash
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    //cleanup function
    return () => socket?.off("newMessage");
  }, [messages, socket, setMessages]);
};

export default useListenMessages;
