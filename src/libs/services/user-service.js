import UserRepository from "../repositories/userRepository";
const bcrypt = require("bcrypt")

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    // console.log("email  :", email)
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
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ error: "Unknown error occurred while creating user" });
  }
};

// export const getUser = async (req, res) => {
//   try {
//     const { email, password } = req.query;
//     const user = await UserRepository.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.error("Error getting user:", error);
//     return res
//       .status(500)
//       .json({ error: "Unknown error occurred while getting user" });
//   }
// };
