import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/messages/send/${selectedConversation._id}`,
        { message },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("Before backend completed Message", messages);
      setMessages([...messages, res.data]);
      console.log("After backend completed Message", messages);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
