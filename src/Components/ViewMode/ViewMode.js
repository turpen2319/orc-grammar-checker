import React from 'react';
import MistakeMarkup from './MistakeMarkup';
import './ViewMode.css';



const ViewMode = ({ imgSrc, onButtonSubmit, mistakes }) => {


	// const imageWidth = window.innerWidth * 0.75;
	// const imageHeight = imageWidth * 1.414;
	const imageWidth = 480;
	const imageHeight = 678.72;
  
	return (
		<div className='center ma3'>
			<div className='absolute'>
				<img id='displayedImage' alt='handwriting' src={imgSrc} style={{ height: imageHeight, width: imageWidth }}/>
				{
					mistakes.map((mistake, i) => {
						return(
							<MistakeMarkup
								key={mistakes[i].id}
								message={mistakes[i].message}
								x1={mistakes[i].x1}
								y1={mistakes[i].y1}
								x2={mistakes[i].x2}
								y2={mistakes[i].y2}
								x3={mistakes[i].x3}
								y3={mistakes[i].y3}
								x4={mistakes[i].x4}
								y4={mistakes[i].y4}
								leftCol={mistakes[i].leftCol}
								rightCol={mistakes[i].rightCol}
								topRow={mistakes[i].topRow}
								bottomRow={mistakes[i].bottomRow}
							/>
						);
					})
				}
			</div>
			<button
					className='absolute'
					onClick={onButtonSubmit}
				>
        	Submit
      	</button>
		</div>

	)
} 



export default ViewMode; //DON'T FORGET TO DO THIS