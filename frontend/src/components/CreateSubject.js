import React, { Component } from 'react'
import axios from 'axios';

const initialState = {
    formData:{
        name: '',
        description: '',
        amount: 0,
    }
};

class CreateSubject extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.formSubmit = this.formSubmit.bind(this);
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

        axios.post("http://localhost:5000/subject/create", data).then(res => {
            // console.log(res)
            if(res.data.success){
                alert("Subject Successfully Created!");
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

    render() {
        return (
            <div>
                <h1>Create Subject</h1>
                <div className="container">
                    <form onSubmit={this.formSubmit}>

                        <div className="mb-3">
                            <label  className="form-label">Subject Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.state.formData.name}
                                name="name"
                                onChange={(e)=> this.handleChange(e)}
                            />
                        </div>

                        <div className="form-floating">
                            <textarea 
                                className="form-control" 
                                placeholder="Description" 
                                style={{ height: "100px"}}
                                name="description"
                                value={this.state.formData.description}
                                onChange={(e)=> this.handleChange(e)}
                            />
                            <label>Comments</label>
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Subject Amount</label>
                            <input 
                                type="number" 
                                className="form-control"
                                name="amount" 
                                value={this.state.formData.amount}
                                onChange={(e)=> this.handleChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Create Subject</button>
                    </form>

                </div>
            </div>
        )
    }
}

export default CreateSubject; 
