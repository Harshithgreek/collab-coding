import './StatusBar.css';

function StatusBar({
    currentFile,
    language,
    cursorPosition,
    isConnected,
    userCount,
    hasUnsavedChanges
}) {
    const getLanguageDisplay = (lang) => {
        const langMap = {
            'javascript': 'JavaScript',
            'typescript': 'TypeScript',
            'python': 'Python',
            'java': 'Java',
            'cpp': 'C++',
            'c': 'C',
            'go': 'Go',
            'html': 'HTML',
            'css': 'CSS',
            'json': 'JSON',
            'markdown': 'Markdown'
        };
        return langMap[lang] || lang.toUpperCase();
    };

    return (
        <div className="status-bar">
            <div className="status-bar-left">
                <div className="status-item status-connection">
                    <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
                    <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>

                {userCount > 0 && (
                    <div className="status-item status-users">
                        <span>👥 {userCount} {userCount === 1 ? 'user' : 'users'}</span>
                    </div>
                )}

                {currentFile && (
                    <div className="status-item status-file">
                        <span>📄 {currentFile.split('/').pop()}{hasUnsavedChanges ? ' ●' : ''}</span>
                    </div>
                )}
            </div>

            <div className="status-bar-right">
                {cursorPosition && (
                    <div className="status-item status-cursor">
                        <span>Ln {cursorPosition.lineNumber}, Col {cursorPosition.column}</span>
                    </div>
                )}

                <div className="status-item status-language">
                    <span>{getLanguageDisplay(language)}</span>
                </div>

                <div className="status-item status-encoding">
                    <span>UTF-8</span>
                </div>

                <div className="status-item status-eol">
                    <span>LF</span>
                </div>
            </div>
        </div>
    );
}

export default StatusBar;
