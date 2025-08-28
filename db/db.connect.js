const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

const initDatabse = async () => {
  try {
    const connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("connected succesfully");
    }
  } catch (error) {
    console.log("connection failed", error);
  }
};

module.exports = {initDatabse}