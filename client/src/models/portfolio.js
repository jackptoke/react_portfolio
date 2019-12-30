const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String,required: true },
    url: { type: String, required: true },
    views: { type: Number, required: true, default: 0 },
    clicks: { type: Number, required: false, default: 0 },
    techs: { type: Array,required: false }
}, {collection: 'portfolios'});
productSchema.plugin(uniqueValidator);
module.exports = mongoose.model('portfolio', productSchema);
