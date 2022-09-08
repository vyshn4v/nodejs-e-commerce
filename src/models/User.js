const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isAdmin: {
    type: Boolean, default: false
  },
}, { timestamps: true });


module.exports=mongoose.model("user",userSchema)