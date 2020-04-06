const mongoose = require('mongoose');
const Schema = mongoose.Schema
const predictSchema = new Schema({
    userid: {
        type: Number,
        trim: true,
        required: true,
    },
    class: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    }
})
const PredictModel = mongoose.model('prediction', predictSchema);
module.exports = PredictModel;