import React from 'react';
import './Square.css';

const Square = (props) => {
	var fw = {};
	console.log(props)
	if (props.val.bold) {
		fw.fontWeight = 'bold';
	}
	  return (<div className="Square" style={fw}>{props.val.val}</div>);
}

export default Square;
