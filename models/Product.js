const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = Product = mongoose.model('Product', ProductSchema);