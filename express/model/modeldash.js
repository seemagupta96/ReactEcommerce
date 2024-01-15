const mongoose = require("mongoose");
const catModel = mongoose.model("Category", new mongoose.Schema({
    Category: { type: String, require: true },
}));
module.exports = catModel;







9