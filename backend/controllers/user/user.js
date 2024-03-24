const STATUS_CODE = require("../../constants/statusCode");
const userModel = require("../../models/user");
const AppError = require("../../utils/AppError");
const saveFileToPublic = require("../../utils/saveFileToPublic");

exports.saveProfile = async (req, res) => {
  let data = {
    ...req.body,
  };
  console.log(req.file);

  if (req.file) {
    let preName = req.user.image;
    let name = saveFileToPublic(req.file, "profile", preName);
    data.image = name;
  }

  if (!data.fullName) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new AppError("Full Name is required!", STATUS_CODE.BAD_REQUEST));
    return;
  }

  let doc = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: data,
    },
    {
      returnOriginal: false
    }
  );


    res
      .status(STATUS_CODE.OK)
      .json({ msg: "Profile updated", statusCode: STATUS_CODE.OK, data: doc });
    return;
};
