import connectMongo from '@/confiig/ConnectDB/ConnectDB';
import Users from '@/libs/models/userModel';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === 'POST') {
      if (!req.body) return res.status(404).json({ error: "Don't have form data...!" });

      const { username, email, password } = req.body;

      const checkexisting = await Users.findOne({ email });
      if (checkexisting) return res.status(422).json({ message: 'User Already Exists...!' });

      const hashedPassword = await hash(password, 12);

      const user = await Users.create({
        username,
        email,
        // Store only the hashed password in the database
        password: hashedPassword,
      });

      // Exclude the hashed password from the response
      const { password: _, ...userWithoutPassword } = user.toObject();

      res.status(201).json({ status: true, user: userWithoutPassword });
    } else {
      res.status(500).json({ message: 'HTTP method not valid; only POST is accepted' });
    }
  } catch (error) {
    console.error('Error in user creation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
