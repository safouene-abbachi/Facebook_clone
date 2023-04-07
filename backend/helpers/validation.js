exports.validateEmail = (value) => {
  const emailValidation =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailValidation.test(value);
};

exports.validatePassword = (value) => {
  const hashedPasswordRegex = /^\$2[aby]\$.{56}$/;
  if (hashedPasswordRegex.test(value)) {
    return true; // skip validation for hashed passwords
  }
  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordValidation.test(value);
};
exports.validateUsername = async (username) => {
  // Moved the User model inside the function to avoid the circular dependency problem
  const User = require('../models/User');
  let found = false;
  // the do while loop executes the code at least one time
  do {
    let existingUsername = await User.findOne({ username });
    if (existingUsername) {
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      found = true;
    } else {
      found = false;
    }
  } while (found);
  return username;
};
