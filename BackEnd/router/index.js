const express = require("express");
const userRouter = require("./userRouter");

const router = express.Router(); // Tạo instance của express.Router()

// Dùng userRouter
router.use("/user", userRouter); // Điều này đảm bảo tất cả API có prefix "/user"

module.exports = router;
