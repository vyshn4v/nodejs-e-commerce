const User = require("../models/User");

const findUsers = () => {//find all users
  return new Promise((resolve, reject) => {
    User.find()
      .then((response) => {
        resolve(response);//resolve all users 
      })
      .catch((err) => {
        reject(err);//if error found reject errpr
      });
  });
};
module.exports = findUsers;
