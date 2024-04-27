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
      min: [6, 'Password must be alteast 6 characters!'],
    },
    photo: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
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

userSchema.methods.generateToken = async function (id, admin) {
  const token = await jwt.sign({ id, admin }, process.env.JWT_SECRET_KEY);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
