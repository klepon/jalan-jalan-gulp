// run react app
import React from 'react';
import ReactDOM from 'react-dom';
import FilterListingApp from './FilterListingApp';

// filter listing
jQuery(function(){
    const $appDom = jQuery('#filter-listing'),
        $appData = jQuery('#jason-data');

    if( $appDom.length < 1 ) {
        return;
    }
    
    ReactDOM.render(
        <FilterListingApp
        data={ JSON.parse( $appData.text().trim() ) }
        type={ $appData.data('type') }
        domain={ $appData.data('url') }
        />,
        $appDom[0]
    );
});

// import other non react js
import { consoleFancy } from '../scripts/console_fancy.js';
consoleFancy();

import { mobileFixNav } from '../scripts/mobile_nav.js';
jQuery(function(){
    mobileFixNav();
});
