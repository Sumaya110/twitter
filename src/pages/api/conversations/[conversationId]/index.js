import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { getConversation } from "@/libs/services/conversation-service";

export default async function handler(req, res) {
  await connectMongo();
  switch (req.method) {
    case "GET":
      return await getConversation(req, res);
    default:
      return res.status(400).json({ error: "Invalid request method" });
  }
}
