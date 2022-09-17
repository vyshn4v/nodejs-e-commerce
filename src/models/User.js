const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  googleId: { type: String },
  username: { type: String, required: [true, "username required"], unique: [true, "username is already registered"] },
  email: {
    type: String, require: [true, "Email requried"], unique: [true, "Email already registered"]
  },
  password: { type: String },
  isAdmin: {
    type: Boolean, default: false
  },
  method: { type: String, required: [true, "method is required"] },
  lastvisited: { type: Date, default: new Date() },
}, { timestamps: true });


module.exports = mongoose.model("user", userSchema)