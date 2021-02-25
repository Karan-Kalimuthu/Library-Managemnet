const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    imagePath: {
        type: String, require: true
    },
    author: {
        type: String, require: true
    }
});

module.exports = mongoose.model('Book', bookSchema);
