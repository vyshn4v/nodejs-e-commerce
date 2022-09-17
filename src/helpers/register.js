const User = require("../models/User");
const bcrypt = require("bcrypt");
const register = ({ username, email, password }) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, Number(process.env.hashSaltRounds))
      .then(async (hash) => {
        const newUser = new User({
          username,
          email,
          password: hash,
          method: "email&password",
        });
        try {
          const savedUser = await newUser.save();
          resolve(savedUser);
        } catch (err) {
          if (err.code == 11000) {
            reject({ status: false, message: "user already logged in" });
          } else {
            reject(err);
          }
        }
      });
  });
};
module.exports = register;
