import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { createUser, getUser, updateUser } from "@/libs/services/user-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "POST":
        return await createUser(req, res);
      case "GET":
        return await getUser(req, res);
      case "PATCH":
        return await updateUser(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
