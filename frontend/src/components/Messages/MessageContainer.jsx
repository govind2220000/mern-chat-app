import React, { useEffect } from "react";
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  //console.log("Selected Conversation1", selectedConversation);

  useEffect(() => {
    //console.log("Selected Conversation2", selectedConversation);
    //cleanup function
    return () => {
      setSelectedConversation(null);
    };
  }, []); //this will run on every unmounting so that we can reset the selectedConversation and the if the user logs in again this global state variable should be resseted

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected></NoChatSelected>
      ) : (
        <>
          {/*Header*/}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages></Messages>
          <MessageInput></MessageInput>
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authuser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authuser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
