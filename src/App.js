import React, { Component } from 'react';
import './App.css';
import patients from './patients.json';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import PatientTable from './PatientTable.js'
import PatientDetails from './PatientDetails.js'

/**
*@author Asha Habib
*
*This is how far I got with the React Coding Challenege. 
*At its current state, it can only bring up the inital home page.
*Routing does not work. 
*/


/**
* This present the user with a 404 error when they reach an unusable url
* @class NotFound
*/
class NotFound extends Component {
	render() {
		return (
			<div>
				<h3 className="Err" >{"404 error - Page not Found. Sorry for the inconvience"}</h3>
			</div>
		)
	}
}

/**
* Component holds the central routing and components for the application. This is the class that is exported to index.js
* @class App
*/
class App extends Component {
	render() {
		return (
			<div>
				<div className="App-header">
					<h1>Generic Medical Group</h1>
				</div>

				<Router>
					<Switch>
						<Route exact path="/" render={(props) => (
							<PatientTable {...props} patients={patients} />
						)} />
						<Route exact path="/:mrn" render={(props) => (
							<PatientDetails {...props} patients={patients} />
						)} />
						<Route path="*" component={NotFound} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;

