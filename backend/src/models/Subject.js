const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Course'
        }
    ]
})

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;

