const express = require("express");
const user = express();
const userController = require("./user");
const catchAsync = require("../../utils/catchasynch")
const upload = require("../../utils/multer")


user.post("/profile", upload.single("file"), catchAsync(userController.saveProfile));


module.exports = user;
