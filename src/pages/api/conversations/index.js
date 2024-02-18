import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import {
  createConversation,
  markSeen,
} from "@/libs/services/conversation-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "POST":
        return await createConversation(req, res);
      case "PATCH":
        return await markSeen(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
