import Users from "../models/userModel";


const findOne = async({email}) => {
  const user = await Users.findOne({email})
  return user;
}

const create = async({email, password: hash}) => {
    console.log(email, "  ",password)
  const user = await Users.create({email, password: hash})
  return user;
}


const UserRepository = {
    findOne, create
}

export default UserRepository

