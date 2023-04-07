const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
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
    const user = new User({
      first_name,
      last_name,
      email,
      username,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};
