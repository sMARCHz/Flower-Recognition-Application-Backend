const mongoose = require('mongoose');
const Schema = mongoose.Schema
const predictSchema = new Schema({
    img: { 
        data: Buffer, contentType: String, uri:  String
    },
    userid: {
        type: Number,
        trim: true,
        required: true,
    },
})
const PredictModel = mongoose.model('prediction', predictSchema);
module.exports = PredictModel;