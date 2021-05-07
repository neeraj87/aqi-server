var express = require('express');
var router = express.Router();

const aqiDataController = require('../controllers/aqi-data-controller');

router.get('/', async (req, res, next) => {
    await aqiDataController.getAQIData();
    res.send('hello');
});

router.post('/', async (req, res, next) => {
    let aqiDataList = [
        {
            "city": 'Lucknow',
            "aqi": 74.90,
            "aqiCategory": 'Satisfactory',
            "aqiCategoryColor": '#66b266',
            "lastUpdated": 1620392362334
        }
    ];

    aqiDataController.createAQIData(aqiDataList);
    res.send('hello');
});

module.exports = router;