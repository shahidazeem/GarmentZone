const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Name is required"],
        minLength: [3, "Minimum length must be 3"]
    }
});

const colorModel = mongoose.model("garmentColor", colorSchema);
module.exports = colorModel;