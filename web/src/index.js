import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'
import config from './config'


axios.defaults.baseURL = config.serverUrl;


ReactDOM.render(<App />, document.getElementById('root'));
