import Users from "../models/userModel";
import { sendMail } from "../utils/sendEmail";

const create = async ({ email, password }) => {
  const verify_token = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const user = await Users.create({ email, password, verify_token });
  await sendMail(user.email, verify_token);
  return user;
};

const findOne = async ({ email }) => {
  const user = await Users.findOne({ email });
  return user;
};

const tokenFindOne = async ({ verify_token }) => {
  const user = await Users.findOne({ verify_token });
  console.log("user from repo: ", user)
  return user;
};

const UserRepository = {
  findOne,
  create,
  tokenFindOne,
};

export default UserRepository;
