const mongoose = require('mongoose');
const { roles } = require('../util/const');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [roles.admin, roles.user],
    default: roles.user,
  }
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Register = new mongoose.model("usersData", userSchema);
module.exports = Register;