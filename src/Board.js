import React from 'react';
import './Board.css';
import Square from './Square';

const Board = (props) => (
  <div className="Board">
  	{props.b.map((r,i)=>
  		<div className="Row" key={i} style={i===2||i===5?{borderBottom:'2px solid black'}:{}}>{r.map((s,j)=>
  			<Square key={j} val={s} change={props.change} />
  		)}</div>
  	)}
  </div>
);

export default Board;
