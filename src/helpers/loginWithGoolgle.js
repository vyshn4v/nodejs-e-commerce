const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')
const client = new OAuth2Client(process.env.clientID)
const jwt = require('jsonwebtoken')

const loginWithGoogle = ({ token }) => {//login with google function
    return new Promise(async (resolve, reject) => {
        try {
            const ticket = await client.verifyIdToken({//verify tocken
                idToken: token,//token from client
                audience: process.env.googleAuthclientID//googleAuthClientId
            })
            const { sub, email } = ticket.getPayload()//destructure google id and email from payload
            const user = await User.findOne({ googleId: sub, email, method: "google" })//check user is already logged in
            if (user) {//if user
                await user.updateOne({
                    $set: { lastvisited: new Date() }//update last visited
                })
                const accessToken = jwt.sign(//jwt token
                    {
                        id: user._id,
                        isAdmin: user.isAdmin
                    },
                    process.env.jwtSecretKey,//jwt secret key from .env file
                    {
                        expiresIn: "3d"
                    }
                )
                resolve({ status: true, user: { ...user._doc, accessToken } })//resollve user details and accesstoken
            } else {
                reject({ status: false, message: "user not found" })//reject error message
            }
        } catch (err) {
            reject(err)//if user not found reject error message
        }
    })
}
module.exports = loginWithGoogle
