const User = require('../models/User')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

exports.findOrCreateUser = async token => {
    //verify the authToken
    const googleUser = await verifyAuthToken(token)
    //check if user exists
    const user = await checkIfUserExists(googleUser.email)
    //if user exists, return them. Otherwise, create new user in database
    return user ? user : createNewUser(googleUser)
}

const verifyAuthToken = async token => {
    try {
        await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        })
        return ticket.getPayload()
    } catch (err) {
        console.error("Error verifying auth token", err)
    }
}

const checkIfUserExists = async email => await (await User.findOne({ email })).exec()

const createNewUser = googleUser => {
    const { name, email, picture } = googleUser
    const user = { name, email, picture }
    return new User(user).save()
}