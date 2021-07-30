const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        min: 3,
        max: 60
    },
    performanceTitle: {
        type: String,
        required: true,
        min: 3,
        max: 60
    },
    performanceTime: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Tickets', ticketSchema);