import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "@/libs/services/post-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "POST":
        return await createPost(req, res);
      case "GET":
        switch (req.query.purpose) {
          case "get-single-post":
            return await getPost(req, res);

          case "get-all-posts":
            return await getPosts(req, res);

          default:
            return res.status(400).json({ error: "Invalid request headers" });
        }
      case "PATCH":
        return await updatePost(req, res);
      case "DELETE":
        console.log("i am here ", req.query)
        return await deletePost(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
