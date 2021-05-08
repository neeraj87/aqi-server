var express = require('express');
var router = express.Router();

const aqiDataController = require('../controllers/aqi-data-controller');

router.get('/get-aqi-data', async (req, res, next) => {
    let { city, start, end } = req.query;

    if(!city) {
        res.status(400).send({message: 'Please send name of the city in the request query'});
        return;
    }

    let response = await aqiDataController.getAQIData(city, start, end);
    res.json(response);
});

router.get('/min-max-aqi', async (req, res, next) => {
    let { start, end } = req.query;
    let response = await aqiDataController.getMaxMinAQI(start, end);
    res.json(response);
});

module.exports = router;