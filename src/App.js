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
      <p>
        {CUSTOM_PHRASES.indexOf(currentPhrase) + 1} / {CUSTOM_PHRASES.length}
      </p>
      <label>
        On a scale from 0 to 10, how do you feel now?
        <input
          type="number"
          min="0"
          max="10"
          onChange={(e) => handleFeelingChange(e.target.value)}
        />
      </label>
      <div className="footer">
        <p>
          This app is designed to help you practice Emotional Freedom Technique (EFT) tapping. EFT is a self-help technique that involves tapping on specific points on the body while focusing on a specific issue or problem. The goal of EFT is to release negative emotions and beliefs, and to promote positive thinking and self-acceptance. To use this app, simply follow the prompts on the screen and tap on the appropriate points on your body. If you're not familiar with EFT tapping, we recommend that you consult a licensed therapist or health professional for more information.
        </p>
        <p>Contact: <a href="mailto: matheus.puppe@gmail.com">Send Email</a></p>
      </div>
    </div>
  );
}

export default App;