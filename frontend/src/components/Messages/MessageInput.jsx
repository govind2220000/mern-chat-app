import { React, useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return; //this means if message input box is empty then do nothing on submit
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative ">
        <input
          type="text"
          className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message} //this is being used so that after sending the message the input field should be empty again and this is being handled at handle submit function
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BiSend></BiSend>
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
