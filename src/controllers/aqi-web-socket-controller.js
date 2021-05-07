const WebSocket = require('ws');
const aqiColorConstant = require('../utilities/aqi-color-constants.json');
const aqiDataController = require('../controllers/aqi-data-controller');

exports.callAQIWebSocket = () => {
    const ws = new WebSocket(process.env.WSS, {
        perMessageDeflate: false
    });

    ws.on('message', function incoming(data) {
        try {
            let aqiDataList = [];

            let parsedData = JSON.parse(data);

            parsedData.forEach(aqiData => {
                let aqi = aqiData.aqi;
                let aqiCategory, aqiCategoryColor;

                if (aqi <= 50) {
                    aqiCategory = 'Good';
                    aqiCategoryColor = '#329932';
                } else if (aqi > 50 && aqi <= 100) {
                    aqiCategory = 'Satisfactory';
                    aqiCategoryColor = '#66b266';
                } else if (aqi > 100 && aqi <= 200) {
                    aqiCategory = 'Moderate';
                    aqiCategoryColor = '#ffcf40';
                } else if (aqi > 200 && aqi <= 300) {
                    aqiCategory = 'Poor';
                    aqiCategoryColor = '#f37735';
                } else if (aqi > 300 && aqi <= 400) {
                    aqiCategory = 'Very Poor';
                    aqiCategoryColor = '#bf0000';
                } else if (aqi > 400 && aqi <= 500) {
                    aqiCategory = 'Severe';
                    aqiCategoryColor = '#800000';
                }

                aqiDataList.push({
                    city: aqiData.city,
                    aqi: parseFloat(aqiData.aqi).toFixed(2),
                    lastUpdated: Date.now()
                });
            });
            aqiDataController.createAQIData(aqiDataList);
        } catch (e) {
            console.log('--- error occurred: ' + e);
        }
    });
};