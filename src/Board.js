import React from 'react';
import './Board.css';
import Square from './Square';

const Board = (props) => (
	<div className="boardWrapper">
	  <div className="Board">
	  	{props.b.map((r,i)=>
	  		<div className="Row" key={i}>{r.map((s,j)=>
	  			<Square key={j} val={s} />
	  		)}</div>
	  	)}
	  </div>
  </div>
);

export default Board;
