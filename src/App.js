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
  "Eu libero as crenças negativas de que eu sempre preciso estar em estado de alerta constante.","Eu escolho acreditar que posso confiar em minha capacidade de lidar com ameaças reais quando elas surgirem.","Eu permito que eu mesmo relaxar e confiar em minha capacidade de proteger a mim mesmo e minha segurança.","Eu escolho liberar a ansiedade e a tensão associadas à vigilância constante.","Eu escolho acreditar que posso viver minha vida sem medo constante.","Eu me permito confiar em minhas habilidades para lidar com qualquer situação de perigo que possa surgir.","Eu escolho liberar a necessidade de controlar tudo ao meu redor e confiar no fluxo da vida.","Eu me permito confiar em minha capacidade de tomar decisões seguras e eficazes para proteger a minha segurança.","Eu escolho liberar a necessidade de estar sempre no comando e confiar em minha capacidade de lidar com o incerto.","Eu escolho acreditar em minha capacidade de viver uma vida equilibrada e segura sem a necessidade de vigilância constante.",
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

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
      <div className="text-center mb-4">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleModalToggle}
        >
          View All Phrases
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">All Phrases</h2>
              <button
                onClick={handleModalToggle}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {CUSTOM_PHRASES.map((phrase, index) => (
                <p key={index} className="p-2 border-b">
                  {index + 1}. {phrase}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
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
