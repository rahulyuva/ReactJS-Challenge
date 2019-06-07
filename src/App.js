import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

/*
* Imported the Component
*/
import RealEstateDataList from './Components/RealEstate/RealEstateDataList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
              <Route exact path="/" component={RealEstateDataList} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;