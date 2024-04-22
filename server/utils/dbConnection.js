import mongoose from 'mongoose';

const dbConnection = () => {
  try {
    const connectDb = mongoose.connect(
      "mongodb://localhost:27017/Talha's-Blog",
    );
  } catch (error) {
    next(error);
  }
};

export default dbConnection;
