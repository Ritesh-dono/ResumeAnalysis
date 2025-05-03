import React from 'react';
import './index.css';

const Result = ({ result }) => {
  const { name, email, phone, skills, match_score, matched_skills, missing_skills } = result;

  const getSuggestions = () => {
    if (missing_skills.length === 0) return ['Your resume is a strong match! 🎯'];

    return missing_skills.map(skill => `Try including the word "${skill}" in your resume.`);
  };

  return (
    <div className="result-box">
      <h2>🔍 Analysis Result</h2>
      <p><strong>👤 Name:</strong> {name}</p>
      <p><strong>📧 Email:</strong> {email}</p>
      <p><strong>📞 Phone:</strong> {phone}</p>

      <p><strong>💼 Extracted Skills:</strong></p>
      <div className="skill-tags">
        {skills.map((s, i) => (
          <span className="tag" key={i}>{s}</span>
        ))}
      </div>

      <p><strong>📊 Match Score:</strong> {match_score}%</p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${match_score}%`, background: match_score > 70 ? '#28a745' : '#ffc107' }}
        />
      </div>

      <div>
        <h4>✅ Matched Keywords:</h4>
        <div className="skill-tags">
          {matched_skills.map((word, i) => (
            <span className="tag green" key={i}>{word}</span>
          ))}
        </div>
      </div>

      <div>
        <h4>❌ Missing Keywords:</h4>
        <div className="skill-tags">
          {missing_skills.map((word, i) => (
            <span className="tag red" key={i}>{word}</span>
          ))}
        </div>
      </div>

      <div>
        <h4>🛠️ Suggested Improvements:</h4>
        <ul>
          {getSuggestions().map((suggestion, i) => (
            <li key={i}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
