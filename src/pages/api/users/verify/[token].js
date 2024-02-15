import connectMongo from '@/confiig/ConnectDB/ConnectDB';
import { updateUser2 } from '@/libs/services/user-service';
import { getVerification } from '@/libs/services/verification-service';

export default async function handler(req, res) {
  const method = req.method;
  const verify_token= req.query.token


  await connectMongo()

  switch (method) {
    case 'GET':
      try {

        const isExpired = await getVerification({
          verify_token,
          expireIn: { $gt: new Date() }
        });
        

        if (!isExpired) {
          return res.status(404).json({ message: 'token expired.' });
        }


        const user = await updateUser2(
          { verify_token: verify_token },
          { isVerified: true }
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
