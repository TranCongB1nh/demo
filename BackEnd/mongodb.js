const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo_app'

// Hàm kết nối MongoDB qua Mongoose
async function connectWithMongoose() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully using Mongoose')
  } catch (error) {
    console.error('MongoDB connection error with Mongoose:', error)

    process.exit(1)
  }
}

module.exports = {
  connectWithMongoose
};