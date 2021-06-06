const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
    },
    passMark: {
        type: Number,
        required: true,
    },
    lecturer: {
        type: String,
        required: true,
    },
    subjects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Subject'
        }
    ]

});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
