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
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    }
});

module.exports = mongoose.model('Post', bookSchema);
