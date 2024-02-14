import UserRepository from "../repositories/userRepository";
const bcrypt = require("bcrypt");

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password, verify_token } = req.body;
    const existingUser = await UserRepository.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await UserRepository.create({
      name,
      username,
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


export const getUser = async (req, res) => {
  try {
    const id= req.query.userId;
    const response = await UserRepository.findOne({_id: id});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserRepository.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserId = async (id) => {
  try {
    const response = await UserRepository.findOne({_id: id});
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (req, res) => {

  // console.log("service : req.body", req.body)
  try {
    const response = await UserRepository.findByIdAndUpdate(req.body);

    console.log("service response : ", response)

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export async function loginWithCredentials(email, password) {
  try {
    const user = await UserRepository.findOne({ email });

    if (!user) {
      throw new Error("No user found with this email. Please sign up.");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error("Username or password doesn't match.");
    }

    if (!user.isVerified) {
      throw new Error("Not verified .");
    }

    return user;
  } catch (error) {
    throw new Error("Error occurred while logging in: " + error.message);
  }
}

export const registerWithSns = async ({ name, email, image }) => {
  let user;
  user = await UserRepository.findOne({ email });

  if (!user) {
    const verify_token = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    var username = email.split("@")[0];
    if (image)
      user = await UserRepository.create({
        name,
        username,
        email,
        profilePicture: image,
        verify_token,
      });
    else
      user = await UserRepository.create({
        name,
        username,
        email,
        verify_token,
      });
  }

  return user;
};
