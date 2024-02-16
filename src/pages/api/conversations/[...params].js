import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { createConversation, getConversation } from "@/libs/services/conversation-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "GET":
        console.log("get  ", req.query)
        return await getConversation(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
