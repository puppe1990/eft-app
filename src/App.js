import React, { useState } from 'react';
import './App.css';
import EFT from './EFT';

function App() {
  const [issue, setIssue] = useState('');
  const [feeling, setFeeling] = useState(0);
  const [phrases, setPhrases] = useState(EFT.DEFAULT_PHRASES);
  const [isCustom, setIsCustom] = useState(false);

  const handleIssueChange = event => {
    setIssue(event.target.value);
  }

  const handleFeelingChange = event => {
    setFeeling(event.target.value);
  }

  const handleCustomChange = event => {
    if (event.target.checked) {
      setIsCustom(event.target.checked);
      setPhrases(EFT.CUSTOM_PHRASES);
    } else {
      setIsCustom(false);
      setPhrases(EFT.DEFAULT_PHRASES);
    }
  }

  const handleTap = () => {
    EFT.tap(issue, feeling, phrases, isCustom);
  }

  return (
    <div className="App">
      <h1>EFT Tapping</h1>
      <label>
        Issue or emotion to focus on:
        <input type="text" value={issue} onChange={handleIssueChange} />
      </label>
      <br />
      <label>
        Feeling (on a scale from 0 to 10):
        <input type="number" min="0" max="10" value={feeling} onChange={handleFeelingChange} />
      </label>
      <br />
      <label>
        Use custom phrases?
        <input type="checkbox" checked={isCustom} onChange={handleCustomChange} />
      </label>
      <br />
      <button onClick={handleTap}>Tap</button>
    </div>
  );
}

export default App;
