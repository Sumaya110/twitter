import Users from "../models/userModel";
import { sendMail } from "../utils/sendEmail";

const create = async ({username, email, password }) => {

  const verify_token = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const user = await Users.create({ username, email, password, verify_token });
  await sendMail(user.email, verify_token);
  return user;
};

const findOne = async ( {email} ) => {
  const user = await Users.findOne({ email });
  return user;
};

const tokenFindOne = async ({ verify_token }) => {
  const user = await Users.findOne({ verify_token });
  return user;
};

const findById = async ( {userId} ) => {
  const user = await Users.findOne({_id: userId });
  console.log("user repo : ", user)
  return user;
};


const findOneAndUpdate = async (updateData) => {
  console.log(
    
    "repo : ", updateData
  )
  const response = await Users.findOneAndUpdate(
    { _id: updateData.userId },
    updateData.updateData,
    { new: true }
  );
  return response;
};

const UserRepository = {
  findOne,
  create,
  tokenFindOne,
  findById,
  findOneAndUpdate
};

export default UserRepository;
