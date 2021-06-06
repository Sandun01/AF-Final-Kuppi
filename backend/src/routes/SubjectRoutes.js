const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/SubjectController.js')

module.exports = function(){

    router.post('/create', subjectController.createSubject);
    router.get('/', subjectController.getAllSubjects);

    return router;

}




