import {
  markAsSeen,
  updateConversation,
} from "@/libs/services/conversation-service";
import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on(
      "send",
      async ({ conversationId, senderId, receiverId, text }) => {
        const message = {
          senderId,
          receiverId,
          text,
        };

        const Conversation = await updateConversation({
          conversationId,
          message,
        });

        if (Conversation) {
          const lastMessage =
            Conversation.messages[Conversation.messages.length - 1];

          io.emit( "receive", { lastMessage, roomId: conversationId });
          io.emit("notification", { lastMessage, roomId: conversationId });
        }
      }
    );

    socket.on("mark-as-seen", async ({ conversationId, messageIds }) => {
      await markAsSeen({ conversationId, messageIds });
      io.emit("marked-as-seen", { conversationId, messageIds });
    });

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
  });

  console.log("Setting up socket");
  res.end();
}
