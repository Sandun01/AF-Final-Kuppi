const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController.js');

module.exports = function(){
    
    router.post('/create', courseController.createCourse);
    router.get('/', courseController.getAllCourses);
    router.get('/:id', courseController.getSubjectsOfCourse);
    router.get('/amount/:id', courseController.calculateAmount);

    return router;

}


