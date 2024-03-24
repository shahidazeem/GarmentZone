const STATUS_CODE = require("../../../constants/statusCode");
const garmentSizeModel = require("../../../models/size");
exports.saveSize = async (req, res) => {
  if (!req.body.size) {
    res.Status(STATUS_CODE.BAD_REQUEST).json({
      msg: "Garment Size is Required.",
      statusCode: STATUS_CODE.BAD_REQUEST,
    });
    return;
  }
  let data = new garmentSizeModel(req.body);
  await data.save();
  res.Status(STATUS_CODE.CREATED).json({
    msg: "Garment Size is Created",
    statusCode: STATUS_CODE.CREATED,
  });
  return;
};

exports.updateColor = async (req, res) => {
  if (!req.body.size) {
    res.Status(STATUS_CODE.BAD_REQUEST).json({
      msg: "Garment Size is Required.",
      statusCode: STATUS_CODE.BAD_REQUEST,
    });
  }
  if (!req.body.id) {
    res.Status(STATUS_CODE.BAD_REQUEST).json({
      msg: "Id is Required.",
      statusCode: STATUS_CODE.BAD_REQUEST,
    });
  }
  let data = await garmentSizeModel.updateOne(
    {_id: req.body.id},
    {
        $set:{
            size: req.body.size,
        }
    }
  );
  if(data.modifiedCount){
    res.Status(STATUS_CODE.UPDATED).json({
        msg:"Garment Size is updated",
        statusCode: STATUS_CODE.UPDATED,
  });
  return;
  }
   res.status(STATUS_CODE.BAD_REQUEST).json({
     msg: "Unable to update",
     statusCode: STATUS_CODE.BAD_REQUEST,
   });
   return;
};
