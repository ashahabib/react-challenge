import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import PatientDetails from './PatientDetails';
//initially wanted to contain code for the Patient Detail page in a separate JS file
import registerServiceWorker from './registerServiceWorker';
import './index.css';
//import { Router, Route,  Link, IndexRoute, Redirect, browserHistory } from 'react-router'

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
