import React, { Component } from 'react'
import axios from 'axios';

class AllCourses extends Component {
    constructor(props){
        super(props);
        this.state={
            courses :[],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/course')
        .then(res => {
            var courseArr = res.data.courses;
            this.setState({
                courses: courseArr,
            })
            console.log(this.state);
        })
        .catch(error => {
            console.log("Error:",error)
        })
    }

    render() {
        return (
            <div>
                <h1>All Courses</h1>

                <div className="container">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Pass Mark</th>
                            <th scope="col">Lecturer</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.length > 0 &&

                                this.state.courses.map(course => (
                                    <tr key={course._id}>
                                        <th scope="row">{course.name}</th>
                                        <td>{course.code}</td>
                                        <td>{course.passMark}</td>
                                        <td>{course.lecturer}</td>
                                        <td>
                                        {/* {
                                            course.subjects.length > 0 &&
                                            course.subjects.map(subject => (
                                                subject.name+ " " 
                                            ))
                                        } */}
                                        <a href={`/course/${course._id}`}>View Course</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }

}

export default AllCourses;