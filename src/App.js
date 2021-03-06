import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import s from './data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board:this.cleanBoard(),
      tries:'attempts: 0'
    };
  }

  hardBoard() {
    var hb =  [[0,0,8],[1,2,3],[1,3,6],[2,1,7],[2,4,9],[2,6,2],[3,1,5],[3,5,7],[4,4,4],[4,5,5],[4,6,7],[5,3,1],[5,7,3],[6,2,1],[6,7,6],[6,8,8],[7,2,8],[7,3,5],[7,7,1],[8,1,9],[8,6,4]];
    this.setState({board:this.cleanBoard()},()=>hb.forEach(v=>this.changeSquare(v[2],v.slice(0,2))));
  }

  cleanBoard() {
    return new Array(9).fill(1).map((r,i)=>new Array(9).fill(1).map((s,j)=>{return{val:'',p:[i,j],bold:false}}));
  }

  solve() {
    var res = s(this.state.board.map(r=>r.map(s=>s.val)));
    var b = this.state.board;
    if (typeof res.b !== 'string') {
      b.forEach((r,i)=>r.forEach((s,j)=>b[i][j].val=res.b[i][j][0]));
    }
    else {
      res.tries += res.b;
    }
    this.setState({tries:'attempts: '+res.tries,board:b});
  }

  changeSquare(v,p) {
    var b = this.state.board;
    b[p[0]][p[1]].val = v>0?v:'';
    b[p[0]][p[1]].bold = v>0?true:false;
    this.setState({board:b});
  }

  undo() {
    var b = this.state.board;
    b.forEach(r=>r.forEach(s=>{
      if (!s.bold) {
        s.val = '';
      }
    }));
    this.setState({tries:'attempts: 0',board:b});
  }

  render() {
    return (
      <div className="App">
        <Board b={this.state.board} change={(v,p)=>this.changeSquare(v,p)}/>
        <div>{this.state.tries}</div>
        <div>
          <button className="button" onClick={()=>this.solve()}>solve</button>
          <button className="button" onClick={()=>this.setState({board:this.cleanBoard(),tries:'attempts: 0'})}>clear</button>
          <button className="button" onClick={()=>this.undo()}>undo solution</button>
        </div>
        <button className="button" onClick={()=>this.hardBoard()}>HARD!</button>
      </div>
    );
  }
}

export default App;
