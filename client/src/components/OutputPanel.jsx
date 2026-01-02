import { useState } from 'react';
import './OutputPanel.css';

function OutputPanel({ output, isRunning, onRun, onClear }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`output-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="output-header">
        <div className="output-title">
          <span className="output-icon">▶️</span>
          <h3>Output</h3>
        </div>
        <div className="output-actions">
          <button
            onClick={onRun}
            disabled={isRunning}
            className="btn-run"
            title="Run Code (Ctrl+Enter)"
          >
            {isRunning ? '⏳ Running...' : '▶️ Run'}
          </button>
          <button
            onClick={onClear}
            className="btn-clear"
            title="Clear Output"
          >
            🗑️ Clear
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-toggle"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="output-content">
          {output.length === 0 ? (
            <div className="output-placeholder">
              <p>Press "Run" or Ctrl+Enter to execute code</p>
              <p className="output-hint">Output will appear here</p>
            </div>
          ) : (
            <div className="output-list">
              {output.map((item, index) => (
                <div
                  key={index}
                  className={`output-item ${item.success ? 'success' : 'error'}`}
                >
                  <div className="output-meta">
                    <span className="output-time">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="output-user">{item.userName}</span>
                    {item.executionTime && (
                      <span className="output-execution-time">
                        ⚡ {item.executionTime}ms
                      </span>
                    )}
                  </div>
                  
                  {item.output && (
                    <pre className="output-text">{item.output}</pre>
                  )}
                  
                  {item.error && (
                    <pre className="output-error">{item.error}</pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OutputPanel;
