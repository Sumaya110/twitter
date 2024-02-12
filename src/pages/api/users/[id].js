// [Id].js

import connectMongo from "@/config/ConnectDB/ConnectDB";
import { getUserById } from "@/libs/services/user-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const userId = req.query.id;

    switch (req.method) {
      case "GET":
        const user = await getUserById(userId);
        
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        
        return res.status(200).json(user);
      default:
        return res.status(400).json({ error: "Invalid request method" });
    }
  } catch (error) {
    console.error("Error in [Id].js:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
