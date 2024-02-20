import Conversation from "../chatmodels/conversation.model.js";
import Message from "../chatmodels/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; //renaming id to receiverId
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    const newMessage = new Message({ senderId, receiverId, message });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
      // await conversation.save(); Here we have to wait for the promise to resolve after that below will be executed.
      // await newMessage.save();
    }
    //but here both saves will be done parallely
    await Promise.all([conversation.save(), newMessage.save()]);

    //SOCKET IO Functionality will go here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; //renaming id to receiverId
    const senderId = req.user._id; //here we are using req.user._id bcoz we are retreiving complete document from the database based on id

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessage controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
