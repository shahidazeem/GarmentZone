const mongoose = require("mongoose");
const sizeSchema = mongoose.Schema({
  size: {
    type: String,
    unique: true,
    required: [true, "Size value is required."],
    minLength: [2, "minimum length must be 2"],
  },
});
const sizeModel = mongoose.model('garmentSize',sizeSchema);
module.exports = sizeModel;