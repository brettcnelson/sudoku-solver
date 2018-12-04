import React from 'react';
import './Square.css';

const Square = (props) => {
	var fw = {};
	if (props.val.bold) {
		fw.fontWeight = 'bold';
	}
	  return (<input className="Square" style={fw} type={'text'} maxLength={1} value={props.val.val} onChange={(e)=>props.change(Number(e.target.value),props.val.p)} />);
}

export default Square;
