const mongoose = require("mongoose");

const garmentTypeSchema = mongoose.Schema({
  type: {
    type: String,
    unique: true,
    required: [true, "Type is required"],
    // minLength: [3, "Minimum length must be 3"],
  },
});

const typeModel = mongoose.model("garmentType", garmentTypeSchema);
module.exports = typeModel;
