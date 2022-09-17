const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const register = ({ username, email, password }) => {//register user
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, Number(process.env.hashSaltRounds))//hash password using bcrypt 
      .then(async (hash) => {
        const user = await User.findOne({ email, method: "email&password" })//find user is already logged in
        if (user) {
          reject({ status: false, message: "user already logged in" });//if user found reject ther error message
        } else {
          //update user credentials
          const newUser = new User({
            username,
            email,
            password: hash,
            method: "email&password",
          });
          try {
            const savedUser = await newUser.save();//save user
            const accessToken = jwt.sign(
              {
                id: savedUser._id,
                isAdmin: savedUser.isAdmin
              },
              process.env.jwtSecretKey,//jwt secret key from .env file
              {
                expiresIn: "3d"//token expired in 3 day
              })
            resolve({ status: true, user: { ...savedUser, accessToken } });//resolve user
          } catch (err) {
            reject(err);//reject err
          }
        }
      });
  });
};
module.exports = register;
