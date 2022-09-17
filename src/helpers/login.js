const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = ({ email, password }) => {//login using email and password
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ email: email, method: "email&password" })//find user from databse
    if (user) {//if user found
      //compare password with hash store in db
      await bcrypt
        .compare(String(password), String(user.password))
        .then(async (status) => {
          //after password validation update lastvisited time
          await user.updateOne({
            $set: { lastvisited: new Date() }//update last visited
          })
          //filter password from user details
          const { password, ...others } = user._doc;
          //generate token for validation
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.jwtSecretKey,//jwt secret key from .env file
            { expiresIn: "3d" }//token expires in 3days
          );
          //password is true 
          if (status) resolve({ status, user: { ...others, accessToken } });//send user details and token
          reject({ status, message: "enter valid password", });//otherwise reject error message
        });
    }
    else {
      reject({ status: false, message: "Enter valid username", });//user not found reject error message
    }
  })
}
module.exports = login;
