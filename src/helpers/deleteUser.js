const User = require("../models/User");

const deleteUser = (id) => {//delete user
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id).then((response) => {//find user and delete by id
      if (response != null) {
        resolve({ status: true, message: "User deleted " });//if user deleted
      } else {
        reject({ status: false, message: "user not found" });//if user not found
      }
    });
  });
};

module.exports = deleteUser;
