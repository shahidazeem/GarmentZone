const express = require("express");
const garmentColors = express();
const garmentColorController = require("./garmentColor");
const catchAsync = require("../../../utils/catchasynch");

garmentColors.post("/", catchAsync(garmentColorController.createColor));
garmentColors.put("/:id", catchAsync(garmentColorController.updateColor));
garmentColors.delete("/:id", catchAsync(garmentColorController.deleteColor));
garmentColors.get("/:id", catchAsync(garmentColorController.getColorById));
garmentColors.get("/", catchAsync(garmentColorController.getAllColors));
module.exports = garmentColors;
