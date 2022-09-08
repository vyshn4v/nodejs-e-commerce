const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .then(async (response) => {
        await bcrypt
          .compare(String(password), String(response.password))
          .then((status) => {
            const { password, ...others } = response._doc;
            const accessToken = jwt.sign(
              {
                id: response._doc._id,
                isAdmin: response._doc.isAdmin,
              },
              process.env.jwtSecretKey,
              { expiresIn: "3d" }
            );
            if (status) resolve({ status, ...others, accessToken });
            reject({
              status,
              message: "enter valid password",
            });
          });
      })
      .catch((err) => {
        reject({
          status: false,
          message: "Enter valid username",
        });
      });
  });
};
module.exports = login;
