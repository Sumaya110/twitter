import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { createPost, getPosts, getPost, updatePost } from "@/libs/services/post-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "POST":
        return await createPost(req, res);
      case "GET":
        return await getPosts(req, res);
      case "GET":
        return await getPost(req, res);
      case "PATCH":
        return await updatePost(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
