import React, { Component } from 'react';
import './App.css';
import myData from './patients.json';
import { Router, Route,  Link, Redirect, browserHistory } from 'react-router'

 /**
 *@author Asha Habib
 *
 *This is how far I got with the React Coding Challenege. 
 *At its current state, it can only bring up the inital home page.
 *Routing does not work. 
 */	
 
 
 
 
 /**
 * This component creates the Patient Table for the application
 * @class PatientTable
 */
class PatientTable extends Component {
	 /**
	 * Constructor. Establishes initial states for variables.
	 */	
	constructor () {
		super();
	
		this.state = {
			col1 : "Name",
			col2 : "MRN",
			col3 :"DOB",
			col4 : "DEMOGRAPHICS", 
			col5 : "TREATMENT SITE",
			showPatientDetails: false,
			patientNum: null,
			redirect: ""
		};
	}
 /**
 * Get the age from the date of birth info in patients.json
 * @param {String} _dob
 * @return {Integer} age
 */	
_getAge (_dob){
	var holder = _dob.replace(/[/]/g,"");
	//month range from 0 - 11
	var month = parseInt(holder.substr(0,2), 10) - 1;
	var year = parseInt(holder.substr(4), 10);
	var day = parseInt(holder.substr(2,2), 10);
	
	var today = new Date();
    var birthDate = new Date(year,month,day);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}	

 /**
 *Handle click event from patient table
 * @param {Object} evt
 * @return {Integer} i
 */	
_handleClick (evt,i) {
	this.setState({showPatientDetails : true});
	window.location.href = "./patientdetails/"+i;
}

 /**
 * Creates the patient table from the data in patient.json
 * @return {Array} patients
 */	
_createPatientArray () {
	var patients = [];
	for (var i = 0; i <myData.length; i++ ) {
		patients[i] = [<tr id = {i} onClick = {(evt) => this._handleClick(evt,i)} className = "App-data-container">
								<td>{myData[i].name.last + ", " + myData[i].name.first}</td>
								<td>{myData[i].mrn}</td>
								<td>{myData[i].dob}</td> 
								<td>{this._getAge(myData[i].dob) + " y.o. " + myData[i].sex} </td>
								<td>{myData[i].treatment_site}</td>
							</tr>];
	}
	
			return patients;
}
	
		render(){
				return (
				<div className="App">
				<Banner/>
					<div>
					<table id = "App-table">
					<colgroup span="5"  className = "App-col" ></colgroup>
					<tr className = "App-titles-container">
						<th> {this.state.col1} </th>
						<th> {this.state.col2} </th>
						<th> {this.state.col3} </th>
						<th> {this.state.col4} </th>
						<th> {this.state.col5} </th>
					</tr>
					<tbody>
						{this._createPatientArray()}
					</tbody>
					</table>
					</div>
				</div>

				);
			
	}
}

 /**
 * Component for Patient Details
 * @class PatientDetails
 */	
class PatientDetails extends Component {
	 /**
	 * Displays the patient details
	 * @param {Integer} patientNum
	 * @return {Array} patient details in JSX format
	 */	
	_createPatientDetails(patientNum) {
		

		var details = [	<div>
					<button id="Detail-back-button" onClick = {() => this._goBack()}> {"< Patients"}</button>
					<h3 className="Detail-name" >{myData[patientNum].name.last + ", " + myData[patientNum].name.first}</h3>
					<div className="Detail-row1">
						<p>{"MRN: "+myData[patientNum].mrn}</p>
						<p>{myData[patientNum].dob}</p>
						<p>{this._getAge(myData[patientNum].dob) + " y.o. " + myData[patientNum].sex}</p>
					</div>
					<div>
						<p>{myData[patientNum].tumor_size_cm + " cm " + myData[patientNum].histology + ", " + myData[patientNum].treatment_site}</p>
					</div>
					<div>
						<p> {myData[patientNum].weight + " lbs." }</p>
							{this._makeWeightGraph()}
					</div>
					</div> ];
					
		return details;
	}
  render () {
	
    return (
		<div className="Detail">
		<Banner/>
		<h3>test</h3>
		</div>
    )
  }
}

 /**
 * Title banner for the application
 * @class Banner
 */
class Banner extends Component {	  
  render () {
	const title = "Generic Medical Group";
    return (
		<div className="App-header">
		  <h1>{title}</h1>
		</div>
    )
  }
}

 /**
 * This present the user with a 404 error when they reach an unusable url
 * @class NotFound
 */
class NotFound extends Component {
  render () {
    return (
	  <div>
      <Banner/>
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
  render () {
	  return(
		  <Router history={browserHistory}>
			  <Route exact path='/' component={PatientTable}/>
			  <Route path='/patientdetails/:key' component={PatientDetails} />
			  <Route path='*' component={NotFound} />
		  </Router>
    );
  }
}


export default App;

