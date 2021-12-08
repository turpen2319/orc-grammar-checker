import React from 'react';


const MistakeMarkup = ({ x1, y1, x2, y2, x3, y3, x4, y4, leftCol, rightCol, topRow }) => {
	return(
		<div className='markup' style={{top: topRow, right: rightCol, left: leftCol, height: (y4-y1), width: (x2-x1)}}></div>
	)
}

export default MistakeMarkup; //DON'T FORGET TO DO THIS
