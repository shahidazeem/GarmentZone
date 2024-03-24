const express = require("express");
const auth = express();
const authController = require("./auth");
const catchAsync = require("../../utils/catchasynch");


auth.post("/login", catchAsync(authController.login));
auth.post("/signup", catchAsync(authController.signup));
auth.post("/verify-jwt", catchAsync(authController.verifyJWT));
auth.post("/send-email-token", catchAsync(authController.sendEmailToken));
auth.post("/verify-email-token", catchAsync(authController.verifyEmailToken));

module.exports = auth;