// run react app
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const appDom = document.getElementById('react-continer');
if( appDom !== null ) {
  ReactDOM.render(<App />, appDom);
}

// import other non react js
import { consoleFancy } from '../scripts/console_fancy.js';
consoleFancy();

import { mobileFixNav } from '../scripts/mobile_nav.js';
jQuery(document).ready(function(){
    mobileFixNav();
});
