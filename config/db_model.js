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
    blogid: {
        type: String,
        required: true
    },
    title: {
        main: {type: String, required: true},
        subtitle: {type: String}
    },
    article: {
        type: String
    }
})

const flowerSchema = new Schema({
    result: {
        flowerid: {
            type: String,
            required: true
        },
        name: {
            th: {type: String},
            en: {type: String},
            sci: {type: String}
        },
        color: {type: String},
        meaning: {
            th: {type: String},
            en: {type: String}
        },
        giving: {type: String},
        picture: {
            large: {type: String},
            medium: {type: String},
            thumbnail: {type: String}
        }
    },
    info: {
        seed: {type: String},
        results: {type: String},
        page: {type: String},
        version: {type: String}
    }
})
const ImgModel = mongoose.model('takepic', ImgSchema);
const PredictModel = mongoose.model('prediction', predictSchema);
const BlogModel = mongoose.model('bloginfo', blogSchema);
const FlowerModel = mongoose.model('flowerinfo',flowerSchema);
module.exports = {
    ImgModel,PredictModel,BlogModel,FlowerModel
};
//mongodb+srv://sMARTz:<password>@flower1-b6hxe.mongodb.net/test?retryWrites=true&w=majority