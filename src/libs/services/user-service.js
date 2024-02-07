import UserRepository from "../repositories/userRepository";
const bcrypt = require("bcrypt")

export const createUser = async (req, res) => {
  try {
    
    const { name, username, email, password,  verify_token } = req.body;
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
    const email = req.query.email
    const response = await UserRepository.findOne({email});
   
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUserId = async (id) => {
  try {
    console.log("service hh : ", id);
    const userId = id;
    const response = await UserRepository.findById( userId );
    console.log("user repo : ", response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const updateUser = async (req, res) => {
  try {
    const response = await UserRepository.findOneAndUpdate(req.body);
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


export const existOrCreate = async ({name, email, image}) => {

  const response = await UserRepository.existOrCreate({name , email, image});
  return response
}


