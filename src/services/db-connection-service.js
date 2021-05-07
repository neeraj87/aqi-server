const dbConfig = require('../../config/db');
const mongoose = require('mongoose');

exports.connectToDb = async () => {
    try {
        const mongoDbURI = dbConfig.mongoURI;

        await mongoose.connect(
            mongoDbURI,
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
};