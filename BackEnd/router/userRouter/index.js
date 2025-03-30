const express = require("express");
const userControllers = require("../../controller/users");
const routes = require("../routes");

const router = express.Router();

// Route xử lý đăng nhập
router.post(routes.user.signIn.value, userControllers.handleSignIn);

// Route xử lý đăng ký
router.post(routes.user.signUp.value, userControllers.handleSignUp);

module.exports = router;
