const User = require("../models/User");

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id).then((response) => {
      if (response != null) {
        resolve({ status: true, message: "User deleted " });
      } else {
        reject({ status: false, message: "user not found" });
      }
    });
  });
};

module.exports = deleteUser;
