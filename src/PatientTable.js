import React, { Component } from 'react';
import { getAge } from './helpers'
import './PatientTable.css'


const PatientTableRow = ({ patient, onClick }) => {
	return <tr className="App-data-container" onClick={onClick}>
		<td>{patient.name.last + ", " + patient.name.first}</td>
		<td>{patient.mrn}</td>
		<td>{patient.dob}</td>
		<td>{getAge(patient.dob) + " y.o. " + patient.sex} </td>
		<td>{patient.treatment_site}</td>
	</tr>
}


export default class PatientTable extends Component {
	constructor() {
		super();

		this.state = {
			col1: "Name",
			col2: "MRN",
			col3: "DOB",
			col4: "Demographics",
			col5: "Treatment Site",
		};
	}

	_createPatientRows() {
		return this.props.patients.map((patient, i) => (
			<PatientTableRow 
				patient={patient} 
				key={patient.mrn}
				onClick={() => this.props.history.push(`/${patient.mrn}`)} />
		))
	}

	render() {
		return (
			<div className="App">
				<div>
					<table id="App-table">
						<colgroup span="5" className="App-col" ></colgroup>
						<tbody>
							<tr className="App-titles-container">
								<th> {this.state.col1} </th>
								<th> {this.state.col2} </th>
								<th> {this.state.col3} </th>
								<th> {this.state.col4} </th>
								<th> {this.state.col5} </th>
							</tr>
							{this._createPatientRows()}
						</tbody>
					</table>
				</div>
			</div>

		);

	}
}
