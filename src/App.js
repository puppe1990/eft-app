import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const POINTS = [
  "Karate chop",
  "Top of head",
  "Eyebrow",
  "Side of eye",
  "Under eye",
  "Under nose",
  "Chin",
  "Collarbone",
  "Chest",
  "Underarm",
];

const CUSTOM_PHRASES = [
  'Even though I struggle with financial abundance, I deeply and completely accept myself.','I have a hard time believing I deserve financial abundance.',"I feel like I'm not worthy of abundance.","I don't know how to attract abundance.","I'm scared that I'll never have enough money.","I'm always worried about money.","I don't trust that I can have abundance.","I don't believe I deserve abundance.","I'm worried that I'll never be able to afford the things I want.","I'm always struggling to make ends meet."
]

function App() {
  const [currentPhrase, setCurrentPhrase] = useState(CUSTOM_PHRASES[0]);
  const [currentPoint, setCurrentPoint] = useState(POINTS[0]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentFeeling, setCurrentFeeling] = useState(null);
  const [isRoutineActive, setIsRoutineActive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(10000);
  const [isPlaying, setIsPlaying] = useState(true);
  const [stopwatch, setStopwatch] = useState(0);
  const formattedTime = new Date(timeRemaining).toISOString().substr(14, 5);
  const formatteStopWatch = new Date(stopwatch * 1000).toLocaleTimeString([], {minute: '2-digit', second: '2-digit'});


  const handleNext = useCallback(() => {
    setTimeRemaining(5000);
    const nextIndex = CUSTOM_PHRASES.indexOf(currentPhrase) + 1;
    if (nextIndex === CUSTOM_PHRASES.length) {
      setCurrentPhrase(CUSTOM_PHRASES[0]);
    } else {
      setCurrentPhrase(CUSTOM_PHRASES[nextIndex]);
    }
    const nextPoint = POINTS.indexOf(currentPoint) + 1;
    if (nextPoint === POINTS.length) {
      setCurrentPoint(POINTS[0]);
    } else {
      setCurrentPoint(POINTS[nextPoint]);
    }
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [currentPhrase, currentPoint, startTime]);

  const handleBack = useCallback(() => {
    setTimeRemaining(5000);
    const previousIndex = CUSTOM_PHRASES.indexOf(currentPhrase) - 1;
    if (previousIndex === -1) {
      setCurrentPhrase(CUSTOM_PHRASES[CUSTOM_PHRASES.length - 1]);
    } else {
      setCurrentPhrase(CUSTOM_PHRASES[previousIndex]);
    }
    const previousPoint = POINTS.indexOf(currentPoint) - 1;
    if (previousPoint === -1) {
      setCurrentPoint(POINTS[POINTS.length - 1]);
    } else {
      setCurrentPoint(POINTS[previousPoint]);
    }
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [currentPhrase, currentPoint, startTime]);

  const handleFeelingChange = (feeling) => {
    setCurrentFeeling(feeling);
    if (currentFeeling === 0) {
      setEndTime(Date.now());
      setIsRoutineActive(false);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setStopwatch(0);
    alert(`Total time: ${stopwatch} seconds`);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isRoutineActive && isPlaying) {
      let intervalId = null;
      intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1000);
        setStopwatch(stopwatch + 1);
        if (timeRemaining === 0) {
          clearInterval(intervalId);
          handleNext();
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRoutineActive, timeRemaining, isPlaying, stopwatch, handleNext]);

  if (!isRoutineActive) {
    const timeTaken = (endTime - startTime) / 1000;
    return (
      <div className="App">
        <h1>EFT Tapping</h1>
        <h2>Time taken: {timeTaken} seconds</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">EFT Tapping</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <table className="table">
            <thead>
              <tr>
                <th>Point</th>
                <th>Phrase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-primary">{currentPoint}</td>
                <td className="text-primary">
                  <div style={{ height: "120px", overflow: "auto" }}>
                    {currentPhrase}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 mb-4">
          <table className="table">
            <thead>
              <tr>
                <th>Timer</th>
                <th>Feeling Scale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-primary fs-1">{formatteStopWatch}</td>
                <td>
                  <label htmlFor="feeling-select">
                    On a scale from 0 to 10, how do you feel now?
                  </label>
                  <select
                    id="feeling-select"
                    className="form-control mx-auto mt-2"
                    onChange={(e) => handleFeelingChange(e.target.value)}
                  >
                    {[...Array(11).keys()].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <p className="mt-3">
                    Position: {CUSTOM_PHRASES.indexOf(currentPhrase) + 1} / {CUSTOM_PHRASES.length}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12 text-center mb-4">
          <div className="timer mb-2">Time remaining: {formattedTime}</div>
          <div className="button-container">
            <button className="btn btn-primary mx-1" onClick={handlePlay}>
              Play
            </button>
            <button className="btn btn-primary mx-1" onClick={handlePause}>
              Pause
            </button>
            <button className="btn btn-primary mx-1" onClick={handleStop}>
              Stop
            </button>
            <button className="btn btn-primary mx-1" onClick={handleBack}>
              Back
            </button>
            <button className="btn btn-primary mx-1" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );


}

export default App;