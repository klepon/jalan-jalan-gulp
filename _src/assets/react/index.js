// run react app
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const appDom = document.getElementById('react-continer');
if( appDom !== null ) {
  ReactDOM.render(<App />, appDom);
}

// import other no react js
// import { mainScript } from '../scripts/scripts.js';
// mainScript();
