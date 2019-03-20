var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
    url: String,
    generated_link: String,
    updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Link', LinkSchema);