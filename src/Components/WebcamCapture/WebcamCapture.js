import React from 'react';
import Webcam from "react-webcam";
import { useHistory } from "react-router-dom";



import './WebcamCapture.css';

const videoConstraints = {
  width: { min: 480 },
  height: { min: 678.72 },
  aspectRatio: 0.707,
  facingMode: { exact: "environment" }
};


const WebcamComponent = ({imgSrc, onImgCapture}) => {
  const webcamRef = React.useRef(null);


  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({width: 480, height: 678.72});
    onImgCapture(imageSrc);
  }, [webcamRef, onImgCapture]);
  console.log(imgSrc);




  let history = useHistory(); //need this for react router

  return (
    <div>
      <Webcam
        audio={false} 
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        width={480}
        height={678.72}
      />
      <button 
        onClick={() => {
          capture();
          history.push('/view-corrections')
        }}
      >
        Capture photo
      </button>
    </div>
  );
};

export default WebcamComponent;