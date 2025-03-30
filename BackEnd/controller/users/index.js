require("dotenv").config();
const { MongoClient } = require("mongodb");
const { httpStatusCodes } = require("../../utils/constant");
const { createBearerToken, getDataFromRequest } = require("../../utils/helper");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function handleSignIn(request, response) {
  try {
    const requestData = await getDataFromRequest(request);
    const { email, password, rememberMe } = requestData;

    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        response.writeHead(httpStatusCodes.UNAUTHORIZED, {
          "Content-Type": "application/json",
        });
        response.end(JSON.stringify({ error: "Invalid email or password" }));
        return;
      }

      const tokenOptions = rememberMe
        ? { expiresIn: "7d" }
        : { expiresIn: "1h" }
      const userToken = jwt.sign({ userId: user._id }, secretKey, tokenOptions);

      response.writeHead(httpStatusCodes.OK, {
        "Content-Type": "application/json",
      });
      response.end(
        JSON.stringify({ token: userToken, 
          username: user.username,
          message: "Login successful" 
        })
      );
    } else {
      response.writeHead(httpStatusCodes.UNAUTHORIZED, {
        "Content-Type": "application/json",
      });
      response.end(JSON.stringify({ error: "Invalid email or password" }));
    }
  } catch (error) {
    console.error("Error during sign-in process:", error);
    response.writeHead(httpStatusCodes.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify({ error: "Internal server error" }));
  }
}

async function handleSignUp(request, response) {
  try {
    const requestData = await getDataFromRequest(request);
    const { username, email, password } = requestData;

    if (!username || !email || !password) {
      response.statusCode = httpStatusCodes.BAD_REQUEST;
      response.end(
        JSON.stringify({
          message: "Username, email, and password are required",
        })
      );
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      response.statusCode = httpStatusCodes.CONFLICT;
      response.end(JSON.stringify({ message: "Email already exists" }));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userToken = createBearerToken(newUser._id);
    response.writeHead(httpStatusCodes.CREATED, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify({ token: userToken, message: "User created successfully" })
    );
  } catch (error) {
    console.error("Error during sign-up:", error);
    response.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    response.end(JSON.stringify({ message: "Internal server error" }));
  }
}

module.exports = {
  handleSignIn,
  handleSignUp,
};
