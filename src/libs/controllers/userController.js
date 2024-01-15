const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { userRepository } = require('../repositories/userRepositories');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '9d' });
};

// Signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }

    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    const exists = await userRepository.findOne({ email });

    if (exists) {
      throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userRepository.create({ email, password: hash });


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
    // Validation
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error('Incorrect password');
    }

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };