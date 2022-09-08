const User = require("../models/User");

const finduser = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = finduser;
