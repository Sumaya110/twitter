import { getUser } from "@/libs/services/user-service";
import connectMongo from "@/confiig/ConnectDB/ConnectDB";

export default async function handler(req, res) {
 
    await connectMongo();
    switch (req.method) {
      case "GET":
        return await getUser(req, res);
      default:
        return res.status(400).json({ error: "Invalid request method" });
    }
  
}
