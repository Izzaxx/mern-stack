import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
    title: String,
    description: {
        type: String,
        required: true
    },
    author: String,
    date: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
)

module.exports = model('Note', noteSchema);