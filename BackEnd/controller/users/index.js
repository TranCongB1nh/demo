require("dotenv").config();
const { MongoClient } = require("mongodb");
const { httpStatusCodes } = require("../../utils/constant");
const { createBearerToken } = require("../../utils/helper");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function handleSignIn(req, res) {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password" });
    }

    const tokenOptions = rememberMe ? { expiresIn: "7d" } : { expiresIn: "1h" };
    const userToken = jwt.sign({ userId: user._id }, secretKey, tokenOptions);

    res.status(httpStatusCodes.OK).json({ token: userToken, username: user.username, message: "Login successful" });

  } catch (error) {
    console.error("Error during sign-in process:", error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
}

async function handleSignUp(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ message: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(httpStatusCodes.CONFLICT).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    const userToken = createBearerToken(newUser._id);
    res.status(httpStatusCodes.CREATED).json({ token: userToken, message: "User created successfully" });

  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleSignIn,
  handleSignUp,
};
