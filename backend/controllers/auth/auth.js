const STATUS_CODE = require("../../constants/statusCode");
const AppError = require("../../utils/AppError");
const userModel = require("../../models/user");
const bycrypt = require("../../utils/bycrypt");
const SendEmail = require("../../utils/emails/sendEmail");
const crypto = require("crypto");
const { createJWT, verify } = require("../../utils/jwt");
exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Email is required!", STATUS_CODE.BAD_REQUEST));
    return;
  }
  if (!password) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Password is required!", STATUS_CODE.BAD_REQUEST));
    return;
  }

  let user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("User not found", STATUS_CODE.BAD_REQUEST));
  }

  let isMatch = await bycrypt.comparePassword(password, user.password);
  if (isMatch) {
    user.password = null;
    user.token = createJWT(user);
    res
      .status(STATUS_CODE.OK)
      .json({
        msg: "Login Successfull",
        statusCode: STATUS_CODE.OK,
        data: user,
      });
    return;
  }

  res
    .status(STATUS_CODE.BAD_REQUEST)
    .json(new AppError("Password is mismatched", STATUS_CODE.BAD_REQUEST));
};

exports.signup = async (req, res) => {
  if (!req.body.email) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Email is required!", STATUS_CODE.BAD_REQUEST));
    return;
  }
  if (!req.body.password && req.body.password.length < 8) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Password is required", STATUS_CODE.BAD_REQUEST));
    return;
  }

  let hashedPassword = await bycrypt.hashPassword(req.body.password);

  if (!hashedPassword) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(new AppError("Unknown error occured", STATUS_CODE.SERVER_ERROR));
    return;
  }

  req.body.password = hashedPassword;
  let data = new userModel(req.body);
  await data
    .save()
    .then(async (user) => {
      let verifyEmailToken = await user.createEmailVerifyToken();
      await user.save({ validateBeforeSave: false });
      SendEmail(req.body.email, verifyEmailToken).catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {});
  res.status(STATUS_CODE.CREATED).json({
    msg: "User created successfully",
    statusCode: STATUS_CODE.CREATED,
  });
};

exports.sendEmailToken = async (req, res) => {
  if (!req.body.email) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Email is required!", STATUS_CODE.BAD_REQUEST));
    return;
  }
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("User not found", STATUS_CODE.BAD_REQUEST));
    return;
  }
  let verifyEmailToken = await user.createEmailVerifyToken();
  console.log(verifyEmailToken);
  await user.save({ validateBeforeSave: false });
  SendEmail(req.body.email, verifyEmailToken).catch((err) => {
    console.log(err);
  });

  res
    .status(STATUS_CODE.OK)
    .json({ msg: "success", statusCode: STATUS_CODE.OK });
};

exports.verifyEmailToken = async (req, res) => {
  let email = req.body.email;
  let code = req.body.code;
  let time = new Date();

  if (!email) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Email is required", STATUS_CODE.BAD_REQUEST));
    return;
  }
  if (!code) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Code is required", STATUS_CODE.BAD_REQUEST));
    return;
  }

  code = crypto.createHash("sha256").update(code).digest("hex");

  let user = await userModel
    .findOne({
      email,
      emailVerificationCode: code,
      // isEmailVerified: false,
    })
    .select("+emailVerificationCodeExpiry");

  if (user) {
    if (user.emailVerificationCodeExpiry < time) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(new AppError("Code expired!", STATUS_CODE.BAD_REQUEST));
      return;
    }
    await userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          isEmailVerified: true,
        },
      }
    );
    res
      .status(STATUS_CODE.OK)
      .json({ msg: "Email verify success", statusCode: STATUS_CODE.OK });
    return;
  }

  res
    .status(STATUS_CODE.BAD_REQUEST)
    .json(new AppError("Code mismatched!", STATUS_CODE.BAD_REQUEST));
  return;
};
exports.verifyJWT = async (req, res) => {
  let token = req.body.token;
  if (!token) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Token is required", STATUS_CODE.BAD_REQUEST));
    return;
  }
  let u = verify(token);
  if (u) {
    let user = await userModel.findOne({ _id: u.userdata?.id });
    if (user) {
      res
        .status(STATUS_CODE.OK)
        .json({
          msg: "Verify Successfull",
          statusCode: STATUS_CODE.OK,
          data: user,
        });
      return;
    }
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ msg: "User not found", statusCode: STATUS_CODE.BAD_REQUEST });
    return;
  }
  res
    .status(STATUS_CODE.BAD_REQUEST)
    .json({ msg: "Token Expired!", statusCode: STATUS_CODE.BAD_REQUEST });
};
