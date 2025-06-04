import React, { useState } from 'react';

const Report = ({ report, repoUrl }) => {
  const [expandedFiles, setExpandedFiles] = useState({});

  // Parse Markdown report into structured data
  const parseReport = () => {
    const lines = report.split('\n').filter(line => line.trim());
    const files = {};
    let currentSection = '';
    let currentFile = '';

    lines.forEach(line => {
      if (line.startsWith('## Linter Issues') || line.startsWith('## Optimization Suggestions')) {
        currentSection = line.includes('Linter Issues') ? 'linter' : 'suggestions';
      } else if (line.startsWith('- ') && line.includes('.py:')) {
        const fileMatch = line.match(/^-\s+([^:]+):/);
        if (fileMatch) {
          currentFile = fileMatch[1].trim();
          if (!files[currentFile]) {
            files[currentFile] = { linter: [], suggestions: [] };
          }
          const issue = line.replace(`- ${currentFile}: `, '').trim();
          files[currentFile][currentSection].push(issue);
        }
      }
    });

    return files;
  };

  const files = parseReport();

  const toggleFile = (file) => {
    setExpandedFiles(prev => ({ ...prev, [file]: !prev[file] }));
  };

  return (
    <div style={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '24px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#333' }}>Code Analysis Report</h2>
      <p style={{ marginBottom: '16px', fontSize: '18px', color: '#333' }}>
        <strong>Repository:</strong>{' '}
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
          {repoUrl}
        </a>
      </p>
      {Object.keys(files).length === 0 ? (
        <p style={{ color: '#666', fontSize: '18px' }}>No issues or proposals found.</p>
      ) : (
        <ul>
          {Object.keys(files).map(file => (
            <li key={file} style={{ marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              <button
                onClick={() => toggleFile(file)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '18px',
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#333',
                }}
              >
                <span>{file}</span>
                <span>{expandedFiles[file] ? '▼' : '▶'}</span>
              </button>
              {expandedFiles[file] && (
                <div style={{ marginTop: '8px', paddingLeft: '16px' }}>
                  {files[file].linter.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '18px', color: '#ef4444', fontWeight: '600' }}>Linter Issues</h3>
                      <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '18px', color: '#333' }}>
                        {files[file].linter.map((issue, idx) => (
                          <li key={idx}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {files[file].suggestions.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: '18px', color: '#f59e0b', fontWeight: '600' }}>Optimization Proposals</h3>
                      <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '18px', color: '#333' }}>
                        {files[file].suggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Report;