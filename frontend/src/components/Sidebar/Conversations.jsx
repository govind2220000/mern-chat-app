import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis.js";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  //console.log("Conversations:", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto ">
      {/* For each conversation in the array, the map function provides two arguments to the callback function: the current item (conversation) and its index (idx). */}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        ></Conversation>
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
