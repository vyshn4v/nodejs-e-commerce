const deleteUser = require("../helpers/deleteUser");
const finduser = require("../helpers/findUser");
const findUsers = require("../helpers/findUsers");
const updateUser = require("../helpers/updateUser");
const {
  verifyToken,
  verifyTokenAndAutherisation,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

router.put("/update/:id", verifyTokenAndAutherisation, async (req, res) => {//update user 
  const { _id, ...others } = req.body;//destructure id and group others
  updateUser(req.params.id, others)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);//send success response
    })
    .catch((err) => {
      res.status(500).json(err);//send error response
    });
});

router.delete("/delete/:id", verifyTokenAndAutherisation, (req, res) => {//delete user
  deleteUser(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get("/finduser/:id", verifyTokenAndAdmin, (req, res) => {//find user by id
  finduser(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/users", verifyTokenAndAdmin, (req, res) => {//all users details
  findUsers()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
