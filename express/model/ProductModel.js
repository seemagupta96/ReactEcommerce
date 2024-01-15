const mongoose = require("mongoose");
const ProductModel = mongoose.model("product", new mongoose.Schema({
    SubCatId: { type: String, require: true },
    PName: { type: String, require: true },
    Price: { type: String, require: true },
    Offer: { type: String, require: true },
    Pic: { type: String, require: true },
    Des: { type: String, require: true },
}));
module.exports = ProductModel;