import React, { useState, useEffect } from "react";
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
];

const MOTIVATIONAL_PHRASES = [
  "You've made a great progress today!",
  "Keep up the good work!",
  "You're getting stronger every day!",
];

function App() {
  const [currentPhrase, setCurrentPhrase] = useState(CUSTOM_PHRASES[0]);
  const [currentPoint, setCurrentPoint] = useState(POINTS[0]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentFeeling, setCurrentFeeling] = useState(null);
  const [isRoutineActive, setIsRoutineActive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(10000);
  const formattedTime = new Date(timeRemaining).toISOString().substr(14, 5);

  const handleNext = () => {
    setTimeRemaining(5000) 
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
  };

  const handleFeelingChange = (feeling) => {
    setCurrentFeeling(feeling);
    if (currentFeeling === 0) {
      setEndTime(Date.now());
      setIsRoutineActive(false);
    }
  };

  useEffect(() => {
    if (isRoutineActive) {
      let intervalId = null;
      intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1000);
        if (timeRemaining === 0) {
          clearInterval(intervalId);
          handleNext();
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRoutineActive, timeRemaining]);



  if (!isRoutineActive) {
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    const randomPhrase =
      MOTIVATIONAL_PHRASES[
        Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)
      ];
    return (
      <div className="App">
        <h1>EFT Tapping</h1>
        <h2>{randomPhrase}</h2>
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
