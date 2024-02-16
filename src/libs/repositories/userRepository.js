import Users from "../models/userModel";

const create = async (payload) => {
  const user = await Users.create(payload);
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

const findOneAndUpdate = async ({ query, payload }) => {
  const response = await Users.findOneAndUpdate(query, payload, { new: true });
  return response;
};

const UserRepository = {
  findOne,
  create,
  findOneAndUpdate,
  find,
};

export default UserRepository;
