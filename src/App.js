import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import s from './data';

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

  solve() {
    var res = s(this.state.board.map(r=>r.map(s=>s.val)));
    if (res) {
      var b = this.state.board.map((r,i)=>r.map((s,j)=>{return{val:res[i][j],p:s.p,bold:s.bold}}));
      this.setState({board:b});
    }
  }

  changeSquare(v,p) {
    var b = this.state.board;
    b[p[0]][p[1]].val = v>0?v:'';
    b[p[0]][p[1]].bold = v>0?true:false;
    this.setState({board:b});
  }

  render() {
    return (
      <div className="App">
        <Board b={this.state.board} change={(v,p)=>this.changeSquare(v,p)}/>
        <div>
          <button className="button" onClick={()=>this.solve()}>solve</button>
          <button className="button" onClick={()=>this.setState({board:this.cleanBoard()})}>clear</button>
        </div>
      </div>
    );
  }
}

export default App;
