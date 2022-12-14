const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId
    }
})

const Question = model('Question', questionSchema)

module.exports = Question