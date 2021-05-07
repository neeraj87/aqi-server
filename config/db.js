module.exports = {
    mongoURI: `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_USER_PASSWORD)}@cluster0.nwbz3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
}