import React, { Component } from 'react';
import Routes from './Routes.js';
import {PageHeader} from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PageHeader>
            <div>
              hi
            </div>
          </PageHeader>
          <Routes />
        </header>
      </div>
    );
  }
}

export default App;
