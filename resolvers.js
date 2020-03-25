const user = {
    _id: "1",
    name: "Paul Test",
    email: "test@email.com",
    picture: "https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg?width=700&crop=2:1"
}

module.exports = {
    Query: {
        me: () => user
    }
}