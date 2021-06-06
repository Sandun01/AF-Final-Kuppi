const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const subjectRoutes = require('./src/routes/SubjectRoutes');
const courseRoutes = require('./src/routes/CourseRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5080;
const MONGODB_URI = process.env.MONGO_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
},(error) => {
    if(error){
        console.log(error)
    }
});

mongoose.connection.once('open', () => {
    console.log('MongoDB Connected...')
})

app.route('/').get((req,res) =>{
    res.send('AF FINAL PAPER BEGIN');
});

app.use('/subject', subjectRoutes());
app.use('/course', courseRoutes());

app.listen(PORT, ()=>{
    console.log(`Server is Running on PORT: ${PORT}`)
});


