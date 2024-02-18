import { updateConversation } from "@/libs/services/conversation-service";
import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send", async({ conversationId, senderId, receiverId, text }) => {
      const message = {
        senderId,
        receiverId,
        text,
      }

      const Conversation = await updateConversation({conversationId, message})
      
      if(Conversation){
        const lastMessage = Conversation.messages.at(-1);
        io.emit("receive", lastMessage);
      }
    });
  });

  console.log("Setting up socket");
  res.end();
}
