const Course = require('../models/Course.js');
const CourseRoutes = require('../routes/CourseRoutes.js');

const createCourse = async(req, res) => {

    if(req.body){
        const course = new Course(req.body);

        await course.save()
        .then(data => {
            res.status(201).send({ success: true, data: data})
        })
        .catch( error => {
            console.log(error)
            res.status(500).send({ success: false, error: error.message})
        });
    }
}

const getAllCourses = async(req, res) => {

    await Course.find({}).populate('subjects', 'name description amount')
    .then( data => {
        res.status(200).send({ success: true, courses: data })
    } )
    .catch(error => {
        console.log(error)
        res.status(500).send({success: false, error: error.message})
    })
}

const getSubjectsOfCourse = async(req, res) => {

    if(req.params && req.params.id){

        await Course.findById(req.params.id).populate('subjects')
        .then(data => {
            res.status(200).send({ success: true, data: data.subjects })

        }).catch(error => {
            console.log(error);
            res.status(500).send({ success: false, error: error.message })
        })
    }

}

const calculateAmount = async(req, res) => {

    if(req.params.id && req.params){
        
        try{
            const course = await Course.findById(req.params.id).populate('subjects');
            var subArr = course.subjects;
            var total = 0;
    
            if(subArr.length > 0){
                subArr.map((subject) => {
                    total = total + subject.amount;
                })
                res.status(200).send({ success: true, totalAmount: total })
            }
            else{
                res.status(200).send({ success: false, message: 'No Subjects Found' })
            }
        }
        catch(error) 
        {
            console.log(error)
            res.send({ success: false, error: error.message })
        }
    }

}

module.exports = {
    createCourse,
    getAllCourses,
    getSubjectsOfCourse,
    calculateAmount,
}

