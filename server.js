const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { findOrCreateUser } = require('./controllers/userController')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(err => console.error(err));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let authToken = null
        let currentUser = null
        try {
            authToken = req.headers.authorization
            if (authToken) {
                //find user in database or, if new user, create the user
                currentUser = await findOrCreateUser(authToken)
            }
        } catch(err) {
            console.error(`Unable to autehnticate user with token ${authToekn}`)
        }
        return { currentUser }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server listening on ${url}`);
    //visit localhost:4000/playground
});