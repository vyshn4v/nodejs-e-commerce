const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {//verify token
  const authHeader = req.headers.token;//get auth header
  if (authHeader) {//if auth header
    const token = authHeader.split(" ")[1];//split token from auth header
    jwt.verify(token, process.env.jwtSecretKey, (err, user) => {//verify token
      if (err)
        res.status(403).json({status: false, message: "Token is not valid",});//if error found send error message
      req.user = user;//set user details
      next();//call next
    });
  } else {//if auth header is null
    res.status(401).json({ status: false, message: "you are not authenticated!" });//send error message
  }
};



const verifyTokenAndAutherisation = (req, res, next) => {//verify token with autherisation
  verifyToken(req, res, () => {//verify token
    if (req.user.id === req.params.id || req.user.isAdmin) {//if user id from token and id from params are equal or admin status from token is true
      next();//grant permission for do next
    } else {
      res.status(403).json({status: false,message: "you are not allowed to do that!"});//send error message
    }
  });
};


const verifyTokenAndAdmin = (req, res, next) => {//verify token with admin
  verifyToken(req, res, () => {//verify token 
    if (req.user.isAdmin) {//if admin status is true
      next();
    } else {
      res.status(403).json({status: false,message: "you are not allowed to do that!"});//send error message
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAutherisation,
  verifyTokenAndAdmin,
};
