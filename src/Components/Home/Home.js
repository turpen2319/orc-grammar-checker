import React from 'react';
import { useHistory } from "react-router-dom";





const Home = ({ imgSrc }) => {
//<Route> will pass the history prop to our components	
	
	let history = useHistory();

	function handleClick() {
    history.push("/webcam");
  }
	
	return (
		<div>
			<div>Home</div>

			<button type='button' onClick={handleClick}> 
				New 
			</button>
		</div>
	);
};



export default Home; //DON'T FORGET TO DO THIS