const User = require("../models/User");

const findUsers = () => {
  return new Promise((resolve, reject) => {
    User.find()
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = findUsers;
