const { sendVerificationMail } = require('../helpers/mailer');
const { generateToken } = require('../helpers/tokens');
const { validateUsername } = require('../helpers/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
    } = req.body;
    const alreadyExistingEmail = await User.findOne({ email });
    if (alreadyExistingEmail) {
      return res.status(409).json({ message: 'email already exists!' });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    let tempUsername = first_name + last_name;
    // Automatically generate username if there is an existing one in the database
    let newUsername = await validateUsername(tempUsername);
    const user = new User({
      first_name,
      last_name,
      email,
      username: newUsername,
      password: cryptedPassword,
      gender,
      bYear,
      bMonth,
      bDay,
    });
    await user.save();
    const emailVerification = generateToken({ id: user._id.toString() }, '30m');
    const url = `${process.env.BASE_URL}/activate/${emailVerification}`;
    sendVerificationMail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Registration success! Please activate your account to start',
    });
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};
