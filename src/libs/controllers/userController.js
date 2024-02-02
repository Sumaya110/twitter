const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
import UserRepository from '../repositories/userRepository';

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '9d' });
};


const signupUser = async (req, res) => {
  const { email, password,  verify_token } = req.body;


  console.log("from controller : ", req.body)

  try {
 
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }

    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    const exists = await UserRepository.findOne({ email });

    if (exists) {
      throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await UserRepository.create({ email, password: hash,  verify_token });


    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await UserRepository.findOne({ email });

    if (!user) {
      throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error('Incorrect password');
    }

    
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getUser = async (req, res) => {
  const email = req.params;
  const user = await UserRepository.findOne({ email });

  console.log("user from controller : ", user)
  res.status(200).json(user);
};


const checkToken = async (token) =>{
  try {
    const check = await UserRepository.tokenFindOne({ verify_token: token} );
    console.log("check  : ", check)
    return check;
  } catch (error) {
    console.error('Error in checkToken:', error);
    throw error;
  }
}


const updateUser = async (req, res) => {


  const { id } = req.params;


  console.log("cont : ", id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  const updatedUser = await UserRepository.findOneAndUpdate({
    userId: id,
    updateData: req.body.updateData,
  });

  if (!updatedUser) {
    return res.status(400).json({ error: "No such post" });
  }
  res.status(200).json(updatedUser);
};

module.exports = { signupUser, loginUser , checkToken, updateUser, getUser};