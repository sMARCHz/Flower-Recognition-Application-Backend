const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const predictSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
        lowercase: true
    }
})
const PredictModel = mongoose.model('prediction', predictSchema);
module.exports = PredictModel;