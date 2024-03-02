import React, { useEffect } from "react";
import Message from "./Message";
import useGetMessage from "../../hooks/useGetMessage.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import { useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const { loading, messages } = useGetMessage();
  // console.log(messages);

  useListenMessages();

  //we are using this for getting the state updtaes from socket immediately in real time. if we do not use this it will not update the state in real time and the another user will not see the updated message on ui until he refreshes or unmounts that component.
  //console.log("Messages form socket", messages);
  // console.log("Messages", messages);
  // console.log("Message length", messages.length);
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message}></Message>
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start a conversation</p>
      )}
    </div>
  );
};

export default Messages;
