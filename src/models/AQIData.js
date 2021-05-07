const mongoose = require('mongoose');

const AqiRecordSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    aqi: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Number,
        required: true
    }
});

mongoose.set('useFindAndModify', false);
const AqiRecords = mongoose.model('AqiRecords', AqiRecordSchema);

module.exports = AqiRecords;