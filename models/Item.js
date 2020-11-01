const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String,default: 'emptyName', required: true },
    url: { type: String,default: 'emptyURL', required: true },
    priority:{type:Number,default:0,required:false},
    date: { type: Date, default: Date.now }
})

module.exports = Item = mongoose.model('Item', ItemSchema);