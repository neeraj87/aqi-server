const mongoose = require('mongoose');
const moment = require('moment');
const AqiRecords = require('../models/AQIData');

exports.getAQIData = async() => {
    console.log('in here');
};

exports.createAQIData = async(aqiDataList) => {
    let startOfHour = moment().startOf('hour').valueOf();
    let endOfHour = moment().endOf('hour').valueOf();

    console.log(startOfHour, endOfHour);

    for (let index = 0; index < aqiDataList.length; index++) {
        const aqiData = aqiDataList[index];
        let result = await AqiRecords.findOne({
            city: aqiData.city,
            lastUpdated: {
                $gt : startOfHour, 
                $lt : endOfHour
            }
        });
        
        if(!result) {
            //perform insertion of aqi data for that hour
            await AqiRecords.create(aqiData);
        }
    }
};