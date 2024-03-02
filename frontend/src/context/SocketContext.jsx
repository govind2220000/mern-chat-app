import { createContext, useEffect, useContext } from "react";
import { useState } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authuser } = useAuthContext();

  useEffect(() => {
    if (authuser) {
      const socket = io("https://mern-chat-app-prod-r0p8.onrender.com", {
        query: {
          userId: authuser._id,
        },
      });
      setSocket(socket);
      // socket.on() is used to listen to the events and "onlineUsers" is the event here . can be used both on client and server side
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      //cleanup function
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authuser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
