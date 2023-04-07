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

    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};
