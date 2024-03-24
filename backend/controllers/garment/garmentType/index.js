const express = require("express");
const garmentType = express();
const garmentTypeController = require("./garmentType");
const catchAsync = require("../../../utils/catchasynch");

garmentType.post("/", catchAsync(garmentTypeController.createGarmentType));
// garmentType.put("/:id", catchAsync(garmentTypeController.updateColor));
// garmentType.delete("/:id", catchAsync(garmentTypeController.deleteColor));
// garmentType.get("/:id", catchAsync(garmentTypeController.getColorById));
 garmentType.get("/", catchAsync(garmentTypeController.getAllGarmentTypes));
module.exports = garmentType;
