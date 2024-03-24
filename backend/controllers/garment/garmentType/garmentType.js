const STATUS_CODE = require("../../../constants/statusCode");
const garmentTypeModel = require("../../../models/type");
exports.createGarmentType = async (req, res) => {
  if (!req.body.type) {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      msg: "Garment Type value is required!",
      statusCode: STATUS_CODE.BAD_REQUEST,
    });
    return;
  }

  let data = new garmentTypeModel(req.body);
  await data.save();
  res.status(STATUS_CODE.OK).json({
    msg: "Garment Type is created",
    statusCode: STATUS_CODE.OK,
  });
  return;
};
exports.getAllGarmentTypes = async (req, res) => {
  let data = await garmentTypeModel.find();
  res.status(STATUS_CODE.OK).json({
    msg: "Types fetched",
    data: data,
    statusCode: STATUS_CODE.OK,
  });
  return;
};

