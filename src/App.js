import React, { useState, useEffect } from 'react';
import './App.css';

const POINTS = [
  'Karate chop',
  'Top of head',
  'Eyebrow',
  'Side of eye',
  'Under eye',
  'Under nose',
  'Chin',
  'Collarbone',
  'Chest',
  'Underarm'
];

const CUSTOM_PHRASES = [
  "Even though I have this fear of public speaking, I deeply and completely accept myself.",
  "Even though I have this headache, I deeply and completely accept myself.",
  "Even though I have this traumatic memory, I deeply and completely accept myself."
];

const MOTIVATIONAL_PHRASES = [
  "You've made a great progress today!",
  "Keep up the good work!",
  "You're getting stronger every day!"
];

function App() {
  const [currentPhrase, setCurrentPhrase] = useState(CUSTOM_PHRASES[0]);
  const [currentPoint, setCurrentPoint] = useState(POINTS[0]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentFeeling, setCurrentFeeling] = useState(null);
  const [isRoutineActive, setIsRoutineActive] = useState(true);

  const handleNext = () => {
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
  if (feeling === 0) {
  setEndTime(Date.now());
  setIsRoutineActive(false);
  }
  };
  
  useEffect(() => {
    if (isRoutineActive) {
      const intervalId = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [isRoutineActive, handleNext]);
  
  useEffect(() => {
  if (isRoutineActive) {
  const intervalId = setInterval(() => {
  handleNext();
  }, 3000);
  return () => clearInterval(intervalId);
  }
  }, [isRoutineActive, handleNext]);
  
  if (!isRoutineActive) {
  const timeTaken = (endTime - startTime) / 1000; // in seconds
  const randomPhrase = MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
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
  <h2>Current Point: {currentPoint}</h2>
  <h2>Current Phrase: {currentPhrase}</h2>
  <label>
  On a scale from 0 to 10, how do you feel now?
<input type="number" min="0" max="10" onChange={e => handleFeelingChange(e.target.value)} />
</label>
</div>
);
}

export default App;
