// This is the main app launcher
import React, { Component } from 'react';
 
// loader
import { PulseLoader } from 'react-spinners';

// Global config
import '../../App.css';
import './LoadingScreen.css';


class ListingLoader extends Component {
  
    render() {

    return (
        <div className='listing-loader'>
            <PulseLoader
                sizeUnit={"px"}
                size={13}
                color={'#4CC2C6'}
            />
        </div>
        );
    }
}

export default ListingLoader;