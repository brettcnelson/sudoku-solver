import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test:2
    };
  }
  render() {
    return (
      <div className="App">
        {this.state.test}
      </div>
    );
  }
}

export default App;
