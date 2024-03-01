import UserRepository from "../repositories/userRepository";
import VerificationRepository from "../repositories/verificationRepository";
import { sendMail } from "../utils/sendEmail";
import { generateVerifyToken } from "../utils/utils";

const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password, profilePicture, coverPicture } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email not valid" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }

    const existingUser = await UserRepository.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const verify_token = generateVerifyToken();

    const newUser = await UserRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      verify_token,
      profilePicture,
      coverPicture,
    });

    const verificationCollection = await VerificationRepository.create({
      userId: newUser._id,
      verify_token: newUser.verify_token,
    });

    if (verificationCollection) await sendMail(email, verify_token);
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
    const id = req.query.userId;
    const response = await UserRepository.findOne({ _id: id });
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

export const updateUser = async (req, res) => {
  try {
    const query = { _id: req.body.userId };
    const payload = req.body.updateData;
    const response = await UserRepository.findOneAndUpdate({ query, payload });
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

export const updateUser2 = async (verify_token, isVerified) => {
  const query = verify_token;
  const payload = isVerified;
  const response = await UserRepository.findOneAndUpdate({ query, payload });

  return response;
};

export const getUserId = async (id) => {
  try {
    const response = await UserRepository.findOne({ _id: id });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
