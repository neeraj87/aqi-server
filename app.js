require('dotenv').config();

const express = require('express');                                                       
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var port = process.env.PORT;

const webSocketController = require('./src/controllers/aqi-web-socket-controller');
const dbConnectionService = require('./src/services/db-connection-service');

dbConnectionService.connectToDb();
webSocketController.callAQIWebSocket();

const api = require('./src/routes/api-routes');

var app = express();

app.set('port', port);
app.use(cors());

app.use('/test', (req, res) => {
    res.send('Staying alive..staying alive..oh.oh.oh.oh..staying aliveeee');
});

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