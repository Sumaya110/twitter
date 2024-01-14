import connectMongo from '../../../../database/conn';
import Users from '../../../../model/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  try {
    await connectMongo();

    // Only POST method is accepted
    if (req.method === 'POST') {
      if (!req.body) return res.status(404).json({ error: "Don't have form data...!" });
      const { username, email, password } = req.body;

      // Check duplicate users
      const checkexisting = await Users.findOne({ email });
      if (checkexisting) return res.status(422).json({ message: 'User Already Exists...!' });

      // Hash password and create user
      const hashedPassword = await hash(password, 12);
      const user = await Users.create({ username, email, password: hashedPassword });

      res.status(201).json({ status: true, user });
    } else {
      res.status(500).json({ message: 'HTTP method not valid; only POST is accepted' });
    }
  } catch (error) {
    console.error('Error in user creation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
