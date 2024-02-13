import connectMongo from '@/confiig/ConnectDB/ConnectDB';
import Users from '@/libs/models/userModel';

export default async function handler(req, res) {
  // const { method, query: { verify_token } } = req;
  const method = req.method;
  const verify_token= req.query.token

  console.log("query  :: ", verify_token)
   console.log("method :: ",method)


  await connectMongo()

  switch (method) {
    case 'GET':
      try {
        const user = await Users.findOneAndUpdate(
          { verify_token },
          { isVerified: true },
          { new: true } 
        );

        if (!user) {
          return res.status(404).json({ message: 'User not found or already verified.' });
        }

        return res.status(200).json({ message: 'Email verified successfully.', user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
      }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}














// import {checkToken} from "@/libs/controllers/userController"
// import connectMongo from "@/confiig/ConnectDB/ConnectDB";


// export default async function handler(req, res) {
//     await connectMongo();
//     const token = req.query.verify;
//     const response= await checkToken(token);
//     console.log("response :", response)
 
//     if(response.verify_token === token)
//       res.redirect("http://localhost:3000/")

//     return res;
// }



// import Users from '@/libs/models/userModel';
// import connectMongo from '@/confiig/ConnectDB/ConnectDB';

// export default async function handler(req, res) {
//   const { token } = req.query;

//   try {
//     await connectMongo();
//     const user = await Users.findOne({ verify_token: token });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid token' });
//     }

//     // Mark the user as verified in the database
//     user.verified = true;
//     await user.save();

//     // Instead of redirecting here, return a success response
//     return res.status(200).json({ message: 'Verification successful' });
//   } catch (error) {
//     console.error('Error verifying user:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }