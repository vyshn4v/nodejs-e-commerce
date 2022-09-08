const User = require("../models/User");

const updateUser = (userId, user) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      userId,
      {
        $set: user,
      },
      { new: true }
    )
      .then((user) => {
        resolve(user);
      })
      .catch(() => {
        return new Error({
          status: false,
          message: "user not updated",
        });
      });
  });
};
module.exports = updateUser;
