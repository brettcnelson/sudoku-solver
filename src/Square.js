import React from 'react';
import './Square.css';

const Square = (props) => {
	var fw = {};
	if (props.val.bold) {
		fw.background = 'black';
		fw.fontWeight = 'bold';
		fw.color = 'white';
	}
	if (props.val.p[1]===2||props.val.p[1]===5) {
		fw.borderRight= '4px solid black';
	}
	return (<input className="Square" style={fw} type={'text'} maxLength={1} value={props.val.val} onChange={(e)=>props.change(Number(e.target.value),props.val.p)} />);
}

export default Square;
