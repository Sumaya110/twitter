import Users from "../models/userModel";

const create = async ({ email, password}) => {
  // console.log(email, "  ", password);
  const user = await Users.create({ email, password});
  return user;
};

const findOne = async ({ email }) => {
  const user = await Users.findOne({ email });
  return user;
};

const UserRepository = {
  findOne,
  create,
};

export default UserRepository;
