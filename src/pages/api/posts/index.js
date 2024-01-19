import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { createPost , getPost } from "@/libs/services/post-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "POST":
        return await createPost(req, res);
      case "GET":
        return await getPost(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
