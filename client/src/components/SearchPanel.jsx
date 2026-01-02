import React, { useState } from 'react';
import './SearchPanel.css';

const SearchPanel = ({ isOpen, onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!searchTerm) return;

    const searchResults = onSearch({
      searchTerm,
      caseSensitive,
      wholeWord,
      useRegex
    });

    setResults(searchResults || []);
  };

  const handleReplace = () => {
    if (!searchTerm || !replaceTerm) return;
    
    // This would be handled by the parent component
    onSearch({
      searchTerm,
      replaceTerm,
      caseSensitive,
      wholeWord,
      useRegex,
      replace: true
    });
  };

  const handleReplaceAll = () => {
    if (!searchTerm || !replaceTerm) return;
    
    onSearch({
      searchTerm,
      replaceTerm,
      caseSensitive,
      wholeWord,
      useRegex,
      replaceAll: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="search-panel">
      <div className="search-header">
        <h3>🔍 Search & Replace</h3>
        <button className="close-search" onClick={onClose}>×</button>
      </div>

      <div className="search-inputs">
        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            placeholder="Replace..."
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
          />
          <button className="replace-button" onClick={handleReplace}>
            Replace
          </button>
          <button className="replace-all-button" onClick={handleReplaceAll}>
            Replace All
          </button>
        </div>
      </div>

      <div className="search-options">
        <label>
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          Match Case (Aa)
        </label>
        <label>
          <input
            type="checkbox"
            checked={wholeWord}
            onChange={(e) => setWholeWord(e.target.checked)}
          />
          Whole Word (ab|)
        </label>
        <label>
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
          />
          Regex (.*)
        </label>
      </div>

      {results.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </div>
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-file">{result.file}</div>
                <div className="result-line">
                  Line {result.line}: {result.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
