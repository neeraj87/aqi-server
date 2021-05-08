const mongoose = require('mongoose');
const moment = require('moment');
const AqiRecords = require('../models/AQIData');

exports.getAQIData = async (city, filterStart, filterEnd) => {
    let aqiResultCondition = {
        city: city
    };

    // if not filter start and end date is provided then show data for current day
    if(!filterStart && !filterEnd) {
        aqiResultCondition.lastUpdated = {
            $gte : moment().startOf('day').valueOf(), 
            $lte : moment().endOf('day').valueOf()
        };
    } else {
        aqiResultCondition.lastUpdated = {
            $gte : filterStart, 
            $lte : filterEnd
        };
    }

    return await AqiRecords.find(aqiResultCondition);
};

exports.getMaxMinAQI = async (filterStart, filterEnd) => {
    let aqiResultCondition = {};

    // if not filter start and end date is provided then show data for current day
    if(!filterStart && !filterEnd) {
        aqiResultCondition.lastUpdated = {
            $gte : moment().startOf('day').valueOf(), 
            $lte : moment().endOf('day').valueOf()
        };
    } else {
        aqiResultCondition.lastUpdated = {
            $gte : filterStart, 
            $lte : filterEnd
        };
    }

    let minAQI = await AqiRecords.find(aqiResultCondition).sort({ aqi: 1 }).limit(1);
    let maxAQI = await AqiRecords.find(aqiResultCondition).sort({ aqi: -1 }).limit(1);

    return {
        minAQI,
        maxAQI
    };
};

exports.createAQIData = async (aqiDataList) => {
    let startOfHour = moment().startOf('hour').valueOf();
    let endOfHour = moment().endOf('hour').valueOf();

    for (let index = 0; index < aqiDataList.length; index++) {
        const aqiData = aqiDataList[index];
        let result = await AqiRecords.findOne({
            city: aqiData.city,
            lastUpdated: {
                $gte : startOfHour, 
                $lte : endOfHour
            }
        });
        
        if(!result) {
            //perform insertion of aqi data for that hour
            await AqiRecords.create(aqiData);
        }
    }
};