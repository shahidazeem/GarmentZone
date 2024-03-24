const STATUS_CODE = require("../../../constants/statusCode");
const garmentColorModel = require("../../../models/color");
exports.createColor = async (req, res) => {
  if (!req.body.name) {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      msg: "Color name is required!",
      statusCode: STATUS_CODE.BAD_REQUEST,
    });
    return;
  }

  let data = new garmentColorModel(req.body);
  await data.save();
  res.status(STATUS_CODE.CREATED).json({
    msg: "Color is created",
    statusCode: STATUS_CODE.OK,
  });
  return;
};

exports.updateColor = async (req, res) => {
  if (!req.params.id) {
    res.status(STATUS_CODE.BAD_REQUEST)
      .json({ msg: "Id is required!", statusCode: STATUS_CODE.BAD_REQUEST });
    return;
  }
  if (!req.body.name) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({
        msg: "Color Name is required!",
        statusCode: STATUS_CODE.BAD_REQUEST,
      });
    return;
  }

  let data = await garmentColorModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    }
  );

  if (data.modifiedCount) {
    res.status(STATUS_CODE.OK).json({
      msg: "Color is updated",
      statusCode: STATUS_CODE.OK,
    });
    return;
  }
  res.status(STATUS_CODE.BAD_REQUEST).json({
    msg: "Unable to update",
    statusCode: STATUS_CODE.BAD_REQUEST,
  });
  return;
};

exports.deleteColor = async (req, res) => {
  if (!req.params.id) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ msg: "Id is required!", statusCode: STATUS_CODE.BAD_REQUEST });
    return;
  }

  let data = await garmentColorModel.deleteOne({ _id: req.params.id });

  if (data.deletedCount) {
    res.status(STATUS_CODE.OK).json({
      msg: "Color is deleted",
      statusCode: STATUS_CODE.OK,
    });
    return;
  }
  res.status(STATUS_CODE.OK).json({
    msg: "Unable to delete",
    statusCode: STATUS_CODE.OK,
  });
  return;
};

exports.getColorById = async (req, res) => {
  if (!req.params.id) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ msg: "Id is required!", statusCode: STATUS_CODE.BAD_REQUEST });
    return;
  }

  let data = await garmentColorModel.findOne({ _id: req.params.id });

  res.status(STATUS_CODE.OK).json({
    msg: "Color fetched",
    data: data,
    statusCode: STATUS_CODE.OK,
  });
  return;
};

exports.getAllColors = async (req, res) => {
  let data = await garmentColorModel.find();

  res.status(STATUS_CODE.OK).json({
    msg: "Colors fetched",
    data: data,
    statusCode: STATUS_CODE.OK,
  });
  return;
};
