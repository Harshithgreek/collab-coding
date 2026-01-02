import React from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'vs-dark', name: 'Dark', icon: '🌙' },
    { id: 'vs', name: 'Light', icon: '☀️' },
    { id: 'hc-black', name: 'High Contrast', icon: '⚡' }
  ];

  return (
    <div className="theme-switcher">
      <label className="theme-label">Theme:</label>
      <div className="theme-options">
        {themes.map(theme => (
          <button
            key={theme.id}
            className={`theme-button ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => onThemeChange(theme.id)}
            title={theme.name}
          >
            <span className="theme-icon">{theme.icon}</span>
            <span className="theme-name">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
