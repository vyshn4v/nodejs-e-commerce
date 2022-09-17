const { OAuth2Client } = require("google-auth-library")
const User = require("../models/User")
const client = new OAuth2Client(process.env.clientID)
const signupWithGoogle = ({ token }) => {
    return new Promise(async (resolve, reject) => {
        try {
            //verify token 
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.clientID
            })
            const { sub, email, name } = ticket.getPayload();//destructure user details from payload
            const user = await User.findOne({ email })//find user is already logged in 
            if (user) {
                console.log(user);
                reject({ status: false, message: "User already logged in" })
            } else {
                const newUser = await new User({
                    googleId: sub,
                    username: name,
                    email,
                    method: "google"
                })
                newUser.save()
                resolve(newUser)
            }
        } catch (err) {
            reject({ status: false, message: "Token expired" })
        }
    })
}
module.exports = signupWithGoogle