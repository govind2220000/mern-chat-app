import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
  },
  { timestamps: true }
); //timestamps is used for creating the timestamps for each document created it will create

const conversation = mongoose.model("Conversation", conversationSchema);

export default conversation;
