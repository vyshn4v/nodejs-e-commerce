const router = require("express").Router();
const login = require("../helpers/login");
const loginWithGoogle = require("../helpers/loginWithGoolgle");
const register = require("../helpers/register");
const signupWithGoogle = require("../helpers/signupWithGoogle");

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

router.post("/signup-with-google", (req, res) => {
  signupWithGoogle(req.body).then((response) => {
    res.json(response)
  }).catch((message) => {
    res.status(401).json(message)
  })
})

router.post("/login-with-google", (req, res) => {
  loginWithGoogle(req.body).then((response) => {
    res.json(response)
  }).catch((message) => {
    res.status(401).json(message)
  })
})
module.exports = router;
