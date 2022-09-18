const router = require("express").Router();
const login = require("../helpers/login");
const loginWithGoogle = require("../helpers/loginWithGoolgle");
const register = require("../helpers/register");
const signupWithGoogle = require("../helpers/signupWithGoogle");

router.post("/register", (req, res) => {//register user
  register(req.body)//register promise from helpers
    .then((data) => {
      res.status(201).json(data);//send register user details
    })
    .catch((err) => {
      res.status(500).json(err);//send error message
    });
});

router.post("/login", (req, res) => {//login user
  login(req.body)//login promise from helpers
    .then((response) => {
      res.status(200).json(response);//send user details 
    })
    .catch((err) => {
      res.status(401).json(err);//send error message
    });
});

router.post("/signup-with-google", (req, res) => {
  signupWithGoogle(req.body).then((response) => {//signup with google promise
    res.json(response)//send response
  }).catch((message) => {
    res.status(401).json(message)//send error
  })
})

router.post("/login-with-google", (req, res) => {
  loginWithGoogle(req.body).then((response) => {//login with google
    res.json(response)//send response 
  }).catch((message) => {
    res.status(401).json(message)//send error message
  })
})
module.exports = router;
