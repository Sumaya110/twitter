import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { deletePost, getPost } from "@/libs/services/post-service";

export default async function handler(req, res) {
  await connectMongo();
  switch (req.method) {
    case "GET":
      return await getPost(req, res);
    case "DELETE":
      return await deletePost(req, res);
    default:
      return res.status(400).json({ error: "Invalid request method" });
  }
}
