const mongoose = require('mongoose');

const zachSchema = new mongoose.Schema({
    identite: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    phone:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    adresse:{
        type: String,
        required: true
    },
    formation:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Zach', zachSchema);