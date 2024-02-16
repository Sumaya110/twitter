import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { createConversation } from "@/libs/services/conversation-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "POST":
        return await createConversation(req, res);
      
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
