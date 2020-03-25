const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config();
const { findOrCreateUser } = require('./controllers/userController');
 
mongoose.connect(process.env.MONGO_URI, 
                { useNewUrlParser: true,
                useUnifiedTopology: true})
.then( () => console.log("DB connected"))
.catch( (err) => console.log(err));
 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if ( authToken ) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch(err) {
      console.log(`unable to auth user with token ${authToken}`);
    }
    return { currentUser };
  }
});
 
server.listen().then(({url}) => {
  console.log(`server listening in ${url}`);
});