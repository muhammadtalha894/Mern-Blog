import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
userSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) next();

    const password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
    this.password = password;
    console.log(password);
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateToken = async function (id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET_KEY);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
