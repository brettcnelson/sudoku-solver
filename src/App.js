import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board:this.cleanBoard()
    };
  }

  cleanBoard() {
    return new Array(9).fill(1).map((r,i)=>new Array(9).fill(1).map((s,j)=>{return{val:'',p:[i,j],bold:false}}));
  }

  clear() {
    var b = this.cleanBoard();
    this.setState({board:b});
  }

  solve() {
    
  }

  // changeSquare() {

  // }

  render() {
    return (
      <div className="App">
        <Board b={this.state.board} />
        <div>
          <button onClick={()=>this.solve()}>solve</button>
          <button onClick={()=>this.clear()}>clear</button>
        </div>
      </div>
    );
  }
}

export default App;
