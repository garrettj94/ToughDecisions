const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    questionId: {
        type: String,
        required: true,
    }
})

const Question = model('Question', questionSchema);

module.exports = Question