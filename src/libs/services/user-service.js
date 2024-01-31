import UserRepository from "../repositories/userRepository";
const bcrypt = require("bcrypt")

export const createUser = async (req, res) => {
  try {
    const { email, password,  verify_token } = req.body;
    const existingUser = await UserRepository.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await UserRepository.create({
      email,
      password: hashedPassword,
      verify_token,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ error: "Unknown error occurred while creating user" });
  }
};

