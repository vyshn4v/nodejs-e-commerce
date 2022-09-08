const router = require("express").Router();
const login = require("../helpers/login");
const register = require("../helpers/register");
router.post("/register", (req, res) => {
  register(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  login(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

module.exports = router;
