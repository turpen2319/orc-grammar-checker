import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";


import WebcamComponent from './Components/WebcamCapture/WebcamCapture';
import ViewMode from './Components/ViewMode/ViewMode';
import Home from './Components/Home/Home';
 

import './App.css';


function App() {
  const [imgSrc, setImgSrc] = useState(null);
  //const [imgList, setImgList] = useState([]);
  const [viewMistakes, setViewMistakes] = useState([]);
  

  const calculateMistakeAnnotations = (responseData) => {
 
    //these dimensions were set in webcamcapture's getScreenshot() function
    const capturedWidth = 480;
    const capturedHeight = 678.72; //aspect ratio of 1:1.414


    const displayedImage = document.getElementById('displayedImage');
    const disWidth = Number(displayedImage.width);
    const disHeight = Number(displayedImage.height);
    console.log(`width!!! ${disWidth}`);
    console.log(`Height!!! ${disHeight}`);

    const grammarMistakes = responseData.handwritingRes[1];

    let mistakeLocations = [];
    for (let m = 0; m < grammarMistakes.length; m++) {
      let mistake = grammarMistakes[m];
      for (let w = 2; w < responseData.handwritingRes.length; w++) {
        let word = responseData.handwritingRes[w];
        // console.log(word);
        if (word.offset >= mistake.offset && word.cursor <= (mistake.length + mistake.offset)) {
          mistakeLocations.push (
            {
              id: "mistake" + m,
              message: mistake.message,
              x1: (word.x1 * disWidth)/capturedWidth,
              y1: (word.y1 * disHeight)/capturedHeight,
              x2: (word.x2 * disWidth)/capturedWidth,
              y2: (word.y2 * disHeight)/capturedHeight,
              x3: (word.x3 * disWidth)/capturedWidth, 
              y3: (word.y3 * disHeight)/capturedHeight,
              x4: (word.x4 * disWidth)/capturedWidth,
              y4: (word.y4 * disHeight)/capturedHeight,
              leftCol: (word.x1 * disWidth)/capturedWidth,
              rightCol: disWidth - ((word.x2 * disWidth)/capturedWidth),
              topRow: disHeight - ((word.y4 * disHeight)/capturedHeight),
              bottomRow: (word.y1 * disHeight)/capturedHeight 
            }
          );
        }
      }
    }
    return mistakeLocations
  }

  const onButtonSubmit = () => {

    fetch('http://localhost:3001/test', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        base64: imgSrc
      })
      
    })
    .then(response => response.json())
    .then(data => {
      console.log(calculateMistakeAnnotations(data));
      setViewMistakes(calculateMistakeAnnotations(data));
      ;
    })
    .catch(err => console.log('could not get grammar data', err));
  }


  return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route 
            exact path='/webcam'  
            render={(props) => 
              <WebcamComponent {...props} imgSrc={imgSrc} onImgCapture={setImgSrc}/>} 
          />
          <Route 
            exact path='/view-corrections'
            render={(props) => <ViewMode {...props} imgSrc={imgSrc} onButtonSubmit={onButtonSubmit} mistakes={viewMistakes}/>}
          />
          <Route path='/' render={() => <div>404</div>} />
        </Switch>  
      </BrowserRouter>
  );
}

export default App;
