
import React from 'react';
import ReactDOM from 'react-dom';

import "regenerator-runtime/runtime"; 

import AppComponent from './AppComponent.es';

export default function main(portletElementId) {

    ReactDOM.render(
        <AppComponent />,
        document.getElementById(portletElementId)
    );

}