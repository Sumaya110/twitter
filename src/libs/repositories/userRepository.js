import Users from "../models/userModel";
import { sendMail } from "../utils/sendEmail";

const create = async (payload) => {
  const verify_token = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const user = await Users.create(payload);
  await sendMail(user.email, verify_token);
  return user;
};

const findOne = async (payload) => {
  const user = await Users.findOne(payload);
  return user;
};

const find = async () => {
  const user = await Users.find();
  return user;
};

const findByIdAndUpdate = async ({query, payload} ) => {

  console.log("query  :::::::: ", query)
  console.log("payload :: ", payload)
  
  const response = await Users.findByIdAndUpdate(query, payload, { new: true });
  return response;
};

// const findOneAndUpdate = async (updateData) => {
//   const response = await Users.findOneAndUpdate(
//     { _id: updateData.userId },
//     updateData.updateData,
//     { new: true }
//   );
//   return response;
// };

const UserRepository = {
  findOne,
  create,
  findByIdAndUpdate,
  find,
};

export default UserRepository;
