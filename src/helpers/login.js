const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ email: email, method: "email&password" })//find user from databse
    if (user) {//if user
      //compare password with hash store in db
      await bcrypt
        .compare(String(password), String(user.password))
        .then(async (status) => {
          //after password validation update lastvisited time
          await user.updateOne({
            $set: { lastvisited: new Date() }
          })
          //filter password from user details
          const { password, ...others } = user._doc;
          //generate token for validation
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.jwtSecretKey,
            { expiresIn: "3d" }
          );
          //check status and send respnse
          if (status) resolve({ status, user: { ...others, accessToken } });
          reject({
            status,
            message: "enter valid password",
          });
        });
    }
    else {
      reject({
        status: false,
        message: "Enter valid username",
      });
    }
  })
}
module.exports = login;
