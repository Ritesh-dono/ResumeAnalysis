import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = ({ setResult }) => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jd) return alert('Please provide both resume and job description.');

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jd', jd);

    setLoading(true);
    try {
      const res = await axios.post('https://resumeanalysis-y0ax.onrender.com/analyze ,{
  method: "POST",
  body: formData
});
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Error analyzing resume');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Upload Resume (PDF):</label>
      <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />

      <label>Paste Job Description:</label>
      <textarea value={jd} onChange={(e) => setJd(e.target.value)} rows="6" />

      <button type="submit" disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};

export default ResumeForm;
