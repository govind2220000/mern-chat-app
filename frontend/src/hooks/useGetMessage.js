import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/messages/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setMessages(res.data);
        console.log("Message", res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);
  //console.log("Messagef", messages);
  return { loading, messages };
};
export default useGetMessage;
