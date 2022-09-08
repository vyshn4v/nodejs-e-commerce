const deleteUser = require("../helpers/deleteUser");
const finduser = require("../helpers/findUser");
const findUsers = require("../helpers/findUsers");
const updateUser = require("../helpers/updateUser");
const {
  verifyToken,
  verifyTokenAndAutherization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

router.put("/update/:id", verifyTokenAndAutherization, async (req, res) => {
  const { _id, ...others } = req.body;
  updateUser(req.params.id, others)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/delete/:id", verifyTokenAndAutherization, (req, res) => {
  deleteUser(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get("/finduser/:id", verifyTokenAndAdmin, (req, res) => {
  finduser(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.get("/users", verifyTokenAndAdmin, (req, res) => {
  findUsers()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
