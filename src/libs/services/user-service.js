import UserRepository from "../repositories/userRepository";
const bcrypt = require("bcrypt")

export const createUser = async (req, res) => {
  try {
    
    // console.log("user  : ",req.body )
    const { username, email, password,  verify_token } = req.body;
    const existingUser = await UserRepository.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await UserRepository.create({
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
    const email = req.query.email

    // console.log("from service email : ", email)
    const response = await UserRepository.findOne({email});
    // console.log("from service response : ", response)

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUserId = async (id) => {
  try {
    console.log("service : ", id);
    const userId = id;

    console.log("from service id : ", userId);
    const response = await UserRepository.findById({ userId });
    console.log("user repo : ", response);

    // Return the response if found
    return response;
  } catch (error) {
    // Throw the error to be caught where the function is called
    throw new Error(error.message);
  }
};


export const updateUser = async (req, res) => {
  try {
    // console.log("ser  : ", req.body)
    const response = await UserRepository.findOneAndUpdate(req.body);

    // console.log("ser 2 : ", response)
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


