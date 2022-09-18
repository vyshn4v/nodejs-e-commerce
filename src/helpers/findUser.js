const User = require("../models/User");

const finduser = (id) => {//find user by id
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((response) => {
        resolve(response);//resolve user details
      })
      .catch((err) => {
        reject(err);//reject error message
      });
  });
};
module.exports = finduser;
