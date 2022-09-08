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
        });
        try {
          const savedUser = await newUser.save();
          resolve(savedUser);
        } catch (err) {
          reject(err);
        }
      });
  });
};
module.exports = register;
