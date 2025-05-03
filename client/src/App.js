import React, { useState } from 'react';
import ResumeForm from './ResumeForm';
import Result from './Result';
import './index.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app-container">
      <h1>AI Resume Analyser</h1>
      <ResumeForm setResult={setResult} />
      {result && <Result result={result} />}
    </div>
  );
}

export default App;
