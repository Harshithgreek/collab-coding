import React from 'react';
import './FileTabs.css';

const FileTabs = ({ tabs, activeTab, onTabChange, onTabClose }) => {
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      js: '📜', jsx: '⚛️', ts: '🔷', tsx: '⚛️',
      py: '🐍', java: '☕', cpp: '⚙️', c: '©️',
      html: '🌐', css: '🎨', json: '📋',
      md: '📝', txt: '📄'
    };
    return icons[ext] || '📄';
  };

  return (
    <div className="file-tabs">
      <div className="tabs-container">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`file-tab ${activeTab === tab.id ? 'active' : ''} ${tab.unsaved ? 'unsaved' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{getFileIcon(tab.filename)}</span>
            <span className="tab-name">{tab.filename}</span>
            {tab.unsaved && <span className="unsaved-indicator">●</span>}
            <button
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              title="Close"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileTabs;
