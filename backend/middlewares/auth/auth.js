const STATUS_CODE = require("../../constants/statusCode");
const userModel = require("../../models/user");
const catchAsync = require("../../utils/catchasynch");
const jwt = require("../../utils/jwt");

const authenticate = catchAsync(async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }
    if (token) {
      const payload = jwt.verify(token);
      if (payload && payload.userdata) {
        const user = await userModel.findOne({ _id: payload.userdata.id });
        if (user) {
          req.user = user;
          next();
          return;
        }
      }
    }

    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({
        msg: "Unauthorized access",
        statusCode: STATUS_CODE.UNAUTHORIZED,
      });
    return;
  } catch (err) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({
        msg: "Authorization Error",
        statusCode: STATUS_CODE.SERVER_ERROR,
      });
    return;
  }
});


const restrictTo = (roles) => (req, res, next) => {
  if (req.user && roles.includes(req.user.role)) {
    next();
    return;
  }
  res
    .status(STATUS_CODE.ACCESS_DENIED)
    .json({ msg: "This service is not availble for you", statusCode: STATUS_CODE.ACCESS_DENIED });
  return;
};

const auth = {
  authenticate,
  restrictTo,
};

module.exports = auth;
