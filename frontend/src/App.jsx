import React, { useState, useEffect } from 'react';
import Report from './Report';
import './styles.css';

const App = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset report when repoUrl changes
  useEffect(() => {
    setReport(null);
    setError(null);
  }, [repoUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('http://localhost:5000/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: repoUrl }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setReport(data.report);
      }
    } catch (err) {
      setError('Failed to fetch report. Ensure the Flask server is running.',err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '25px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px' }}>
        Code Review Assistant
      </h1>
      <div style={{ marginBottom: '32px' }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}
        >
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repository URL"
            style={{
              width: '800px',
              height: '50px',
              padding: '12px',
              fontSize: '18px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            required
          />
          <button
            type="submit"
            style={{
              height: '50px',
              padding: '0 24px',
              fontSize: '18px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Code'}
          </button>
        </form>
      </div>
      {error && (
        <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '16px', fontSize: '18px' }}>
          {error}
        </p>
      )}
      {report && <Report report={report} repoUrl={repoUrl} />}
    </div>
  );
};

export default App;