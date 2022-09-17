const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')
const client = new OAuth2Client(process.env.clientID)
const jwt = require('jsonwebtoken')
const loginWithGoogle = ({ token }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.clientID
            })
            const { sub, email } = ticket.getPayload()
            const user = await User.findOne({ googleId: sub, email, method: "google" })
            if (user) {
                await user.updateOne({
                    $set: { lastvisited: new Date() }
                })
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        isAdmin: user.isAdmin
                    },
                    process.env.jwtSecretKey,
                    {
                        expiresIn: "2m"
                    }
                )
                resolve({ status: true, user: { ...user._doc, accessToken } })
            } else {
                reject({ status: false, message: "user not found" })
            }
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = loginWithGoogle
