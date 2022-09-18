const { OAuth2Client } = require("google-auth-library")
const User = require("../models/User")
const client = new OAuth2Client(process.env.clientID)
const jwt = require('jsonwebtoken')
const signupWithGoogle = ({ token }) => {
    return new Promise(async (resolve, reject) => {
        try {
            //verify token 
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.googleAuthclientID
            })
            const { sub, email, name } = ticket.getPayload();//destructure user details from payload
            const user = await User.findOne({ email, method: "google" })//find user is already logged in 
            if (user) {//if user already registered
                reject({ status: false, message: "User already logged in" })//reject error
            } else {//user is not found
                const newUser = await new User({
                    googleId: sub,
                    username: name,
                    email,
                    method: "google"
                }).save()//save user
                const acessToken = jwt.sign(
                    {
                        id: newUser._id,
                        isAdmin: newUser.isAdmin
                    },
                    process.env.jwtSecretKey,//jwt secret key
                    {
                        expiresIn: "3d"
                    }
                )
                resolve({ status: true, user: { ...newUser, acessToken } })//resolve new user and access token
            }
        } catch (err) {//if err 
            reject({ status: false, message: "Token expired" })//reject error message
        }
    })
}
module.exports = signupWithGoogle