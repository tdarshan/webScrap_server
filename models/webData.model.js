const mongoose = require('mongoose');

const webDataSchema = new mongoose.Schema({
    domainName: {
        type : String,
        required: true
    }, 
    wordCount: {
        type: String,
        required: true
    },
    favourite:{
        type: Boolean,
        default: false
    },
    webLinks:{
        type: [String],
        required: true
    },
    mediaLinks: {
        type: [String],
        required: true
    }
});

const WebData = new mongoose.model('webdata', webDataSchema);

module.exports = WebData;