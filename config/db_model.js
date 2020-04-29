const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImgSchema = new Schema({
    img: { 
        data: Buffer, contentType: String, uri:  String
    },
    userid: {
        type: String,
        trim: true,
        required: true,
    }
})

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

const blogSchema = new Schema({
    info: {
        seed: {type: String},
        result: {type: String},
        page: {type: String},
        version: {type: String}
    }
})
const ImgModel = mongoose.model('takepic', ImgSchema);
const PredictModel = mongoose.model('prediction', predictSchema);
const BlogSchema = mongoose.model('pageinfo', blogSchema);
module.exports = {
    ImgModel,PredictModel,BlogSchema
};
//mongodb+srv://sMARTz:<password>@flower1-b6hxe.mongodb.net/test?retryWrites=true&w=majority