const { AuthenticationError }  = require('apollo-server')

/*
const user = {
    _id: "1",
    name: "Paul Test",
    email: "test@email.com",
    picture: "https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg?width=700&crop=2:1"
};
*/

const authenticated = next => (root, args, ctx, info) => {
    if (!ctx.currentUser) {
        throw new AuthenticationError('You must be logged in to proceed.')
    }
    return next(root, args, ctx, info)
}

module.exports = {
    Query: {
        me: authenticated((root, args, ctx) => ctx.currentUser)
    }
}