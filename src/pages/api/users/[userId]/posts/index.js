import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { getPosts } from "@/libs/services/post-service";

export default async function handler(req, res) {
 
    await connectMongo();
    switch (req.method) {
      case "GET":
        return await getPosts(req, res);
      default:
        return res.status(400).json({ error: "Invalid request method" });
    }
  
}
