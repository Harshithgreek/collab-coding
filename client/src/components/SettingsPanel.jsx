import React, { useState } from 'react';
import './SettingsPanel.css';

const SettingsPanel = ({ settings, onSettingsChange, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onSettingsChange(updated);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>⚙️ Editor Settings</h2>
          <button className="close-settings" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-content">
          <div className="settings-section">
            <h3>Editor Appearance</h3>
            
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.minimap}
                  onChange={(e) => handleChange('minimap', e.target.checked)}
                />
                Show Minimap
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.lineNumbers}
                  onChange={(e) => handleChange('lineNumbers', e.target.checked)}
                />
                Show Line Numbers
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.wordWrap}
                  onChange={(e) => handleChange('wordWrap', e.target.checked)}
                />
                Word Wrap
              </label>
            </div>

            <div className="setting-item">
              <label>
                Font Size: {localSettings.fontSize}px
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={localSettings.fontSize}
                  onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Editor Behavior</h3>
            
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.autoSave}
                  onChange={(e) => handleChange('autoSave', e.target.checked)}
                />
                Auto Save
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.formatOnSave}
                  onChange={(e) => handleChange('formatOnSave', e.target.checked)}
                />
                Format on Save
              </label>
            </div>

            <div className="setting-item">
              <label>
                Tab Size: {localSettings.tabSize}
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={localSettings.tabSize}
                  onChange={(e) => handleChange('tabSize', parseInt(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Advanced Features</h3>
            
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.bracketPairColorization}
                  onChange={(e) => handleChange('bracketPairColorization', e.target.checked)}
                />
                Bracket Pair Colorization
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.folding}
                  onChange={(e) => handleChange('folding', e.target.checked)}
                />
                Code Folding
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.renderWhitespace}
                  onChange={(e) => handleChange('renderWhitespace', e.target.checked)}
                />
                Show Whitespace
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
