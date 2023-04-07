const mongoose = require('mongoose');
const { validateEmail, validatePassword } = require('../helpers/validation');

const { ObjectId } = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'first name is required'],
      minLength: 3,
      maxLength: 10,
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, 'lastname  is required'],
      minLength: 3,
      maxLength: 10,
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'email  is required'],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validateEmail(value),
        message: 'Invalid email',
      },
    },
    password: {
      type: String,
      required: [true, 'password  is required'],
      minlength: [4, 'Password must be at least 4 characters long'],
      maxLength: 40,
      trim: true,
      validate: {
        validator: (value) => validatePassword(value),
        message: (props) =>
          `${props.value} is not a valid password. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character.`,
      },
    },
    picture: {
      type: String,
      default: 'link of picture',
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: ['Male', 'Female'],
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,

      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          // It's a reference for the user schema
          type: ObjectId,
          ref: 'User',
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      college: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        // AN enum : is the only allowed values are those in the array
        enum: ['Single', 'Married', 'In a realtionship', 'Divorced'],
      },
      instagram: {
        type: String,
      },
      savedPosts: [
        {
          post: {
            type: ObjectId,
            ref: 'Post',
          },
          savedAt: {
            type: Date,
            default: new Date(),
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
