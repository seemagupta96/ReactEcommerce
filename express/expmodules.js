const mongoose = require('mongoose');

const myflip = mongoose.model("project2", new mongoose.Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    passward: { type: String, require: true },
    confirmpassward: { type: String, require: true }
}));
module.exports = myflip