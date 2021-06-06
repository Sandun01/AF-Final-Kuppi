import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import AllCourses from './components/AllCourses';
import CreateCourse from './components/CreateCourse';
import CreateSubject from './components/CreateSubject';
import ViewCourse from './components/ViewCourse';

export default class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Router>
                    <Switch>
                        <Route exact path='/' component={AllCourses} />
                        <Route exact path='/course' component={CreateCourse} /> 
                        <Route exact path='/course/:id' component={ViewCourse} /> 
                        <Route exact path='/subject' component={CreateSubject} /> 
                    </Switch>
                </Router>
            </div>
        )
    }
}
