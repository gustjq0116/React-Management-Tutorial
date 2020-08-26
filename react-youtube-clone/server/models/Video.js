const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const videorSchema = mongoose.Schema({

    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        maxLength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    categoty: {
        type: String
    },
    filePath: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }


}, { timestamps: true});
const Video = mongoose.model('Video', videorSchema);

module.exports = { Video }