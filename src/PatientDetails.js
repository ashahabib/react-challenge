import React, { Component } from 'react';
import { getAge } from './helpers'
import './PatientDetails.css'


export default class PatientDetails extends Component {
    _createPatientDetails(patient) {
        return <div>
            <button id="Detail-back-button" onClick={() => this.props.history.goBack()}> {"< Patients"}</button>

            <div className='Detail-body'>
                <h3 className="Detail-name" >{patient.name.last + ", " + patient.name.first}</h3>
                <div className="Detail-row1">
                    <p>{"MRN: " + patient.mrn}</p>
                    <p>{patient.dob}</p>
                    <p>{getAge(patient.dob) + " y.o. " + patient.sex}</p>
                </div>
                <div>
                    <p>{patient.tumor_size_cm + " cm " + patient.histology + ", " + patient.treatment_site}</p>
                </div>
                <div>
                    <p> {patient.weight + " lbs."}</p>
                </div>
            </div>
        </div>
    }

    render() {
        const patient = this.props.patients.find((patient) => {
            return patient.mrn === this.props.match.params.mrn
        })

        return (
            <div className="Detail">
                {this._createPatientDetails(patient)}
            </div>
        )
    }
}