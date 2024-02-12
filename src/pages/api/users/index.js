import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import {
  createUser,
  getUser,
  updateUser,
  getUsers,
} from "@/libs/services/user-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "POST":
        return await createUser(req, res);
      case "GET":
        return await getUsers(req, res);
        // switch (req.query.purpose) {
        //   case "get-a-user":
        //     return await getUser(req, res);
        //   case "get-all-users":
        //     return await getUsers(req, res);
        //   default:
        //     return res.status(400).json({ error: "Invalid request headers" });
        // }
      case "PATCH":
        return await updateUser(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
