import React, { useState } from 'react';
import './ExtensionsManager.css';

const ExtensionsManager = ({ isOpen, onClose, extensions, onInstall, onUninstall, onToggle }) => {
  const [activeTab, setActiveTab] = useState('installed');
  
  const availableExtensions = [
    {
      id: 'prettier',
      name: 'Prettier',
      description: 'Code formatter for consistent style',
      icon: '✨',
      installed: false
    },
    {
      id: 'eslint',
      name: 'ESLint',
      description: 'JavaScript linting and code quality',
      icon: '🔍',
      installed: false
    },
    {
      id: 'gitlens',
      name: 'Git Lens',
      description: 'Enhanced Git capabilities',
      icon: '🔱',
      installed: false
    },
    {
      id: 'snippets',
      name: 'Code Snippets',
      description: 'Useful code snippets library',
      icon: '📝',
      installed: false
    },
    {
      id: 'live-share',
      name: 'Live Share',
      description: 'Real-time collaborative editing',
      icon: '🤝',
      installed: true,
      enabled: true
    }
  ];

  const installedExtensions = extensions || availableExtensions.filter(ext => ext.installed);

  if (!isOpen) return null;

  return (
    <div className="extensions-overlay" onClick={onClose}>
      <div className="extensions-manager" onClick={(e) => e.stopPropagation()}>
        <div className="extensions-header">
          <h2>🧩 Extensions Manager</h2>
          <button className="close-extensions" onClick={onClose}>×</button>
        </div>

        <div className="extensions-tabs">
          <button
            className={`ext-tab ${activeTab === 'installed' ? 'active' : ''}`}
            onClick={() => setActiveTab('installed')}
          >
            Installed ({installedExtensions.length})
          </button>
          <button
            className={`ext-tab ${activeTab === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketplace')}
          >
            Marketplace
          </button>
        </div>

        <div className="extensions-content">
          {activeTab === 'installed' ? (
            <div className="extensions-list">
              {installedExtensions.length === 0 ? (
                <div className="no-extensions">
                  No extensions installed yet. Check the Marketplace!
                </div>
              ) : (
                installedExtensions.map(ext => (
                  <div key={ext.id} className="extension-item">
                    <div className="ext-icon">{ext.icon}</div>
                    <div className="ext-info">
                      <div className="ext-name">{ext.name}</div>
                      <div className="ext-description">{ext.description}</div>
                    </div>
                    <div className="ext-actions">
                      <button
                        className={`toggle-button ${ext.enabled ? 'enabled' : 'disabled'}`}
                        onClick={() => onToggle && onToggle(ext.id)}
                      >
                        {ext.enabled ? '✓ Enabled' : 'Disabled'}
                      </button>
                      <button
                        className="uninstall-button"
                        onClick={() => onUninstall && onUninstall(ext.id)}
                      >
                        Uninstall
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="extensions-list">
              {availableExtensions.map(ext => (
                <div key={ext.id} className="extension-item">
                  <div className="ext-icon">{ext.icon}</div>
                  <div className="ext-info">
                    <div className="ext-name">{ext.name}</div>
                    <div className="ext-description">{ext.description}</div>
                  </div>
                  <div className="ext-actions">
                    {ext.installed ? (
                      <button className="installed-badge" disabled>
                        ✓ Installed
                      </button>
                    ) : (
                      <button
                        className="install-button"
                        onClick={() => onInstall && onInstall(ext)}
                      >
                        Install
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtensionsManager;
