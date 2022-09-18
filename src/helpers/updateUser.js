const User = require("../models/User");

const updateUser = (userId, user) => {//update user
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(//find user by id
      userId,
      {
        $set: user,//set user details
      },
      { new: true }//return new user details true
    )
      .then((user) => {
        resolve(user);//resolve new user details
      })
      .catch(() => {
        reject({ status: false, message: "user not updated", });//reject error message
      });
  });
};
module.exports = updateUser;
