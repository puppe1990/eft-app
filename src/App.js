import React, { useState, useEffect, useCallback } from "react";
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

];

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
    <div className="App">
      <h1>EFT Tapping</h1>
      <h2 class="point">Current Point: {currentPoint}</h2>
      <h2 class="phrase">Current Phrase: {currentPhrase}</h2>
      <div class="timer">Time remaining: {formattedTime}</div>
      <div className="button-container">
        <button className="play-button" onClick={handlePlay}>
          Play
        </button>
        <button className="pause-button" onClick={handlePause}>
          Pause
        </button>
        <button className="stop-button" onClick={handleStop}>
          Stop
        </button>
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
      <label>
        On a scale from 0 to 10, how do you feel now?
        <input
          type="number"
          min="0"
          max="10"
          onChange={(e) => handleFeelingChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default App;