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
  "Even though I struggle with financial abundance, I deeply and completely accept myself.",
  "I have a hard time believing I deserve financial abundance.",
  "I feel like I'm not worthy of abundance.",
  "I don't know how to attract abundance.",
  "I'm scared that I'll never have enough money.",
  "I'm always worried about money.",
  "I don't trust that I can have abundance.",
  "I don't believe I deserve abundance.",
  "I'm worried that I'll never be able to afford the things I want.",
  "I'm always struggling to make ends meet.",
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
  const formatteStopWatch = new Date(stopwatch * 1000)
    .toISOString()
    .substr(14, 5);

  const handleNext = useCallback(() => {
    setTimeRemaining(5000);
    const nextIndex = CUSTOM_PHRASES.indexOf(currentPhrase) + 1;
    if (nextIndex === -1) {
      setCurrentPhrase(CUSTOM_PHRASES[0]); // Go to start of array
    } else if (nextIndex === CUSTOM_PHRASES.length) {
      setCurrentPhrase(CUSTOM_PHRASES[0]); // Reset to start of array
    } else {
      setCurrentPhrase(CUSTOM_PHRASES[nextIndex]);
    }
    const nextPoint = POINTS.indexOf(currentPoint) + 1;
    if (nextPoint === POINTS.length) {
      setCurrentPoint(POINTS[0]); // Reset to start of array
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
      setCurrentPhrase(CUSTOM_PHRASES[CUSTOM_PHRASES.length - 1]); // Go to end of array
    } else {
      setCurrentPhrase(CUSTOM_PHRASES[previousIndex]);
    }
    const previousPoint = POINTS.indexOf(currentPoint) - 1;
    if (previousPoint === -1) {
      setCurrentPoint(POINTS[POINTS.length - 1]); // Go to end of array
    } else {
      setCurrentPoint(POINTS[previousPoint]);
    }
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [currentPhrase, currentPoint, startTime]);

  const handleFeelingChange = (feeling) => {
    setCurrentFeeling(feeling);
    if (feeling === "0") {
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
    alert(`Total time: ${formatteStopWatch}`);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 37) {
        // Left arrow key
        handleBack();
      } else if (event.keyCode === 39) {
        // Right arrow key
        handleNext();
      } else if (event.keyCode === 32) {
        // Space key
        setIsPlaying(!isPlaying);
      }
    },
    [handleBack, handleNext, isPlaying]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (isRoutineActive && isPlaying) {
      let intervalId = null;
      intervalId = setInterval(() => {
        setTimeRemaining((prev) => prev - 1000);
        setStopwatch((prev) => prev + 1);
        if (timeRemaining <= 0) {
          clearInterval(intervalId);
          handleNext();
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRoutineActive, timeRemaining, isPlaying, handleNext]);

  if (!isRoutineActive) {
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">EFT Tapping</h1>
          <h2 className="text-xl">
            Time taken:{" "}
            <span className="text-indigo-600">{timeTaken} seconds</span>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-bold mb-8">EFT Tapping</h1>
      <div className="flex flex-wrap -mx-4 justify-center">
        {/* Left Column */}
        <div className="w-full md:w-1/2 mb-8 px-4">
          <div className="bg-white shadow-md rounded p-6 h-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Current Point & Phrase
            </h2>
            <div className="mb-4">
              <p className="text-xl text-indigo-600 font-medium">
                {currentPoint}
              </p>
            </div>
            <div className="h-48 overflow-auto">
              <p className="text-lg text-gray-800">{currentPhrase}</p>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="w-full md:w-1/2 mb-8 px-4">
          <div className="bg-white shadow-md rounded p-6 h-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Timer & Feeling Scale
            </h2>
            <div className="mb-4">
              <p className="text-4xl text-indigo-600 font-bold">
                {formatteStopWatch}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="feeling-select"
                className="block text-sm font-medium text-gray-700"
              >
                On a scale from 0 to 10, how do you feel now?
              </label>
              <select
                id="feeling-select"
                className="mt-2 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => handleFeelingChange(e.target.value)}
              >
                <option value="">Select</option>
                {[...Array(11).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-500">
              Position: {CUSTOM_PHRASES.indexOf(currentPhrase) + 1} /{" "}
              {CUSTOM_PHRASES.length}
            </p>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-center items-center mb-8">
        <div className="text-center">
          <div className="text-xl mb-4">
            Time remaining:{" "}
            <span className="text-indigo-600">{formattedTime}</span>
          </div>
          <div className="space-x-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handlePlay}
            >
              Play
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handlePause}
            >
              Pause
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleStop}
            >
              Stop
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
