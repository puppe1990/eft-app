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
"Eu abraço a incerteza e o medo ao avançar em direção ao meu negócio dos sonhos.","Confio na minha capacidade e coragem para superar qualquer obstáculo no início do meu negócio.","Eu sou digno e capaz de ter sucesso em meu novo empreendimento comercial.","Eu escolho enfrentar meus medos e transformá-los em combustível para o sucesso do meu negócio.","Estou confiante em minha capacidade de aprender e crescer enquanto navego pelos desafios de iniciar um negócio.","Eu encaro o fracasso como uma oportunidade de crescimento e sucesso no meu negócio.","Sou antifrágil e persistente diante dos desafios de iniciar meu negócio.","Acredito na minha visão para o meu negócio e estou empenhado em torná-la realidade.","Estou aberto a receber apoio e orientação durante o processo de abertura de um negócio.","Sou forte e determinado em minha busca pelo sucesso em meu novo empreendimento.",
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
  const formattedTime = new Date(timeRemaining).toISOString().substr(14, 5);

  const handleNext = () => {
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
  };

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
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isRoutineActive && isPlaying) {
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
  }, [isRoutineActive, timeRemaining, isPlaying]);

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
        <button className="stop-button" onClick={handleStop}>
          Stop
        </button>
        <button className="pause-button" onClick={handlePause}>
          Pause
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