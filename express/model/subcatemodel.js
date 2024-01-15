const mongoose = require("mongoose");
const subcatModel = mongoose.model("subcategori", new mongoose.Schema({
    Categoryid: { type: String, require: true },
    Subcategory: { type: String, require: true }

}));
module.exports = subcatModel;