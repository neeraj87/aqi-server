require('dotenv').config();

const express = require('express');                                                       
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var path = require('path');
var port = process.env.PORT;

const webSocketController = require('./src/controllers/aqi-web-socket-controller');
//webSocketController.callAQIWebSocket();

const api = require('./src/routes/api-routes');

var app = express();

const db = require('./config/db').mongoURI;
mongoose.connect(
    db,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

app.set('port', port);
app.use(cors());

app.use('/api/v1', verifyToken, api);

process.on('uncaughtException', function (err) {
    winston.log('info', '-------------- UNCAUGHT EXCEPTION: ' + err);
    winston.log('info', '------------- ERROR STACK -------------');
    winston.log('info', err.stack);
    winston.log('info', '---------------------------------------');
});

function verifyToken(req, res, next) {
    var receivedHeaders = req.headers;
    if(receivedHeaders["api-token"] == process.env.API_TOKEN) {
        next();
    } else {
        //send 403 status
        res.sendStatus(403);
    }
}

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});

module.exports = app;