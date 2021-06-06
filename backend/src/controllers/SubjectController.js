const Subject = require('../models/Subject');

const createSubject = async(req, res) => {

    if(req.body){
        const subject = new Subject(req.body)
        
        await subject.save()
        .then( data => {
            res.status(201).send({ success: true, 'subject': data })
        })
        .catch( (error) => {
            console.log('Error', error)
            res.status(500).send({ success: false, 'Error': error })
        } )
    }
}

const getAllSubjects = async(req, res) => {

    await Subject.find({})
    .then( data => {
        res.status(200).send({ success: true, subjects: data })
    } )
    .catch(error => {
        console.log(error)
        res.status(500).send({success: false, error: error.message})
    })
}



module.exports = {
    createSubject,
    getAllSubjects,
}




