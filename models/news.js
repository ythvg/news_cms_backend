var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('News', NewsSchema);
