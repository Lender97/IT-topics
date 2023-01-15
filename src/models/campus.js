const mongoose = require('mongoose');

const CampusSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 4, maxLength: 50 },
    location: {
        type: String,
        required: true,
        enum: ['Geel', 'Lier', 'Turnhout'],
        message: "je kan enkel kiezen uit Geel, Lier of Turnhout"
    },
    address: { type: String },
    image: { type: String }
}, {
    collection: 'campus'
});

module.exports = mongoose.model('Campus', CampusSchema);