import React, { Component } from 'react'
import axios from 'axios'

class ViewCourse extends Component {

    constructor(props){
        super(props);
        this.state = {
            subjects:[],
            totalAmount: 0,
        }
        
    }

    componentDidMount(){
        var c_id = this.props.match.params.id;

        axios.get("http://localhost:5000/course/"+c_id)
        .then(res => {
            // console.log(res);
            var arr = res.data.data;
            this.setState({
                subjects: arr,
            })
            // console.log(this.state);
        })
        .catch(error => {
            console.log(error);
        })
        
        axios.get("http://localhost:5000/course/amount/"+c_id)
        .then(res => {
            var amount = res.data.totalAmount;
            this.setState({
                totalAmount: amount,
            })
            console.log(this.state);
        })
        .catch(error => {
            console.log(error);
        })

    }

    render() {
        return (
            <div>

                { this.state.subjects.length > 0 && 
                    this.state.subjects.map(sub => (
                    <div className="card my-3 mx-3" key={sub._id}>
                        <div className="card-body">
                            <h4>Subject Name: {sub.name}</h4>
                            <h4>Subject Description: {sub.description}</h4>
                            <h4>Subject Amount: {sub.amount}</h4>
                        </div>
                    </div>

                    ))
                }
               
                <h4 style={{color: 'red', textDecoration:'underline', margin: 10,}}>
                    Total Amount: Rs.{this.state.totalAmount}
                </h4>

            </div>
        )
    }
}

export default ViewCourse; 