import Users from "../models/userModel";
import { sendMail } from "../utils/sendEmail";

const create = async ({ name, username, email, password }) => {

  const verify_token = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const user = await Users.create({ name, username, email, password, verify_token });
  await sendMail(user.email, verify_token);
  return user;
};

const findOne = async ({ email }) => {
  const user = await Users.findOne({ email });
  return user;
};

const tokenFindOne = async ({ verify_token }) => {
  const user = await Users.findOne({ verify_token });
  return user;
};

const findById = async (userId ) => {
  const user = await Users.findOne({ _id: userId });
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

const existOrCreate = async ({ name, email, image }) => {
  console.log(name, email, image)
  let user;
  user = await Users.findOne({ email });

  //console.log(user)

  if (!user) {
    const verify_token = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    var username = email.split('@')[0];
    if(image)
      user = await Users.create({name, username, email, profilePicture:image,  verify_token });
    else 
      user = await Users.create({name, username, email,  verify_token });
  }

  return user;
};

const UserRepository = {
  findOne,
  create,
  tokenFindOne,
  findById,
  findOneAndUpdate,
  existOrCreate,
};

export default UserRepository;
