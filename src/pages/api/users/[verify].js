import {checkToken} from "@/libs/controllers/userController"
import connectMongo from "@/confiig/ConnectDB/ConnectDB";


export default async function handler(req, res) {
    await connectMongo();
    const token = req.query.verify;
    const response= await checkToken(token);
    console.log("response :", response)
 
    if(response.verify_token === token)
      res.redirect("http://localhost:3000/")

    return res;
}
