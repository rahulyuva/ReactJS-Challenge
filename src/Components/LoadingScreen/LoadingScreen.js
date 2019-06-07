// This is the main app launcher
import React, { Component } from 'react';
 
// loader
import { BeatLoader } from 'react-spinners';

// Global config
import '../../App.css';
import './LoadingScreen.css';


class LoadingScreen extends Component {
  
    render() {

    return (
        <div className='loading-screen'>
            <BeatLoader
                sizeUnit={"px"}
                size={15}
                color={'#4CC2C6'}
            />
            <h4>Loading, Please wait...</h4>
        </div>
        );
    }
}

export default LoadingScreen;