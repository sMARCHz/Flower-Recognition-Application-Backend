const mongoose = require('mongoose');
const Schema = mongoose.Schema
const productSchema = new Schema({
    img: { data: Buffer, contentType: String },
    id: Number
})
const ProductModel = mongoose.model('Product', productSchema);
module.exports.DBmodel = ProductModel;

//mongodb+srv://sMARTz:<password>@flower1-b6hxe.mongodb.net/test?retryWrites=true&w=majority