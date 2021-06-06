import React, { Component } from 'react'
import axios from 'axios';
import Selector from 'react-select';

const initialState = {
    formData:{
        name: '',
        code: '',
        passMark: 0,
        lecturer: '',
        subjects: [],
    },
    options: [],
};

class CreateCourse extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.formSubmit = this.formSubmit.bind(this);
        this.onSubjectSelect = this.onSubjectSelect.bind(this);
    }

    handleChange = (e) => {

        var data = this.state.formData
        var fieldValue = e.target.value;
        var fieldName = e.target.name;

        if(fieldName){
            data[fieldName] = fieldValue;
            this.setState({
                formData: data
            })
        }
        // console.log(this.state)
    }
    
    formSubmit(e){
        
        e.preventDefault();
        var data = this.state.formData;
        console.log(data)
        
        axios.post("http://localhost:5000/course/create", data).then(res => {
            // console.log(res)
            if(res.data.success){
                alert("Course Successfully Created!");
            }
            else{
                alert("Error: ",res.error)
            }
            
            setTimeout(() => {
                window.location.reload(false);
            }, 1500)
            
        })
        .catch( error => {
            console.log('Error', error)
        })
        
    }

    onSubjectSelect(e) {
        var data = this.state.formData;
        data['subjects'] = e ? e.map(item => item.value): [];

        this.setState({
            selectedSubjects: data,
        })
        // console.log(this.state)
    }

    componentDidMount(){
        axios.get("http://localhost:5000/subject")
        .then(res => {
            var data = this.state.formData;
            var arr = [];
            res.data.subjects.map((item) => (
                arr.push({ value: item._id, label: item.name})
            ))
            // data['subjects'] = res.data.subjects;
            this.setState({
                formData: data,
                options: arr,
            })

            // console.log(this.state);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h1>Create Course</h1>

                <div className="container">
                    <form onSubmit={this.formSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Course Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name"
                                onChange={(e)=> this.handleChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Course Code</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="code"
                                onChange={(e)=> this.handleChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Course Pass Mark</label>
                            <input 
                                type="number" 
                                className="form-control"
                                name="passMark"
                                onChange={(e)=> this.handleChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Lecturer Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="lecturer"
                                onChange={(e)=> this.handleChange(e)}
                            />
                        </div>

                        <Selector 
                            className="basic-multi-select mb-3"
                            options={this.state.options}
                            isMulti
                            onChange={this.onSubjectSelect}
                        ></Selector>

                        <button type="submit" className="btn btn-primary">Create Course</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default CreateCourse;